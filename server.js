const express = require('express');
const session = require('express-session');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const low = require('lowdb');
const _ = require('lodash');
const lodashId = require('lodash-id');
const FileAsync = require('lowdb/adapters/FileAsync');
const port = process.env.PORT || 8080;
const nodeEnv = process.env.NODE_ENV || 'development';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(bodyParser.json());
app.use(compression({filter: shouldCompress}));
app.use(express.static(__dirname + '/build'));
app.use(session({
    name: 'chat-app-demo',
    secret: 'qwert12345yuiop67890',
    cookie: {
        maxAge: 24 * 3600 * 1000,
    },
    resave: false,
    saveUninitialized: false,
}));
app.use(function (err, req, res, next) {
    const { status = 500, messages } = err;
    console.error(message);
    // console.error(err.stack);
    res.status(status).send({ status, messages });
});
io.use(checkSocketAuth);

function shouldCompress(req, res) {
    if (   req.headers['x-no-compression']
        || (/\.(png|jpg|gif|pdf)$/.test(req.path)) ) {
        return false;
    }
    return compression.filter(req, res);
};
function serveIndexPage (res) {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
};
// TODO
function checkSocketAuth (socket, next) {
    next(); 
}
function checkAuth (req, res, next) {
    if (!req.session.user_id) {
        res.status(401).send('You are not authorized to view this page');
    } 
    else {
        next();
    }
}
// TODO
function encryptPassword (password) {
    return password;
}
function initRoutes () {
    app.get('/', function (req, res){
        serveIndexPage(res);
    })
    app.get('/register.html', function (req, res){
        res.sendFile(path.resolve(__dirname, 'build', 'register.html'));
    })
    app.get('/login.html', function (req, res){
        res.sendFile(path.resolve(__dirname, 'build', 'login.html'));
    })
    /*
    app.get('/index.html', function (req, res){
        serveIndexPage(res);
    })
    */
    app.get('*', function (req, res){
        serveIndexPage(res);
    })
}

const adapter = new FileAsync('db.json');

low(adapter)
    .then(db => {
        db._.mixin(lodashId);

        app.post('/new-group', checkAuth, (req, res) => {
            const { name, messages, users } = req.body;
            const obj = { name, messages, users };
            db.get('groups')
                .insert(obj)
                .write()
                .then(group => {
                    res.status(200).send({status: 200, group});
                    io.emit('new group', group);
                })
                .catch(err => {
                    throw { message: 'Failed to create a new group.' };
                });
        });
        app.post('/edit-group-name', checkAuth, (req, res) => {
            const { id, name } = req.body;
            const obj = { id, name };
            db.get('groups')
                .updateById(id, {name})
                .write()
                .then(group => {
                    res.status(200).send({status: 200, group});
                    io.emit('edit group name', group);
                })
        });
        app.post('/delete-group', checkAuth, (req, res) => {
            const { id } = req.body;
            db.get('groups')
                .removeById(id)
                .write()
                .then(group => {
                    res.status(200).send({status: 200, group});
                    io.emit('delete group', group);
                });
        });

        /*
        app.post('/new-message', checkAuth, (req, res) => {
            const { id, message } = req.body;
            const { name, text } = message;
            db.get('groups')
                .getById(id)
                .get('messages')
                .insert({name, text})
                .write()
                .then(message => res.status(200).send({message}));
        });
        */

        app.post('/new-user-in-group', checkAuth, (req, res) => {
            const { id, name } = req.body;
            const user = db.get('users')
                .find({name})
                .value();

            if (user) {
                const obj = {id: user.id, name};
                const newUser = db.get('groups')
                    .getById(id)
                    .get('users')
                    .insert(obj)
                    .write();

                const data = {
                    groupId: id,
                    user: newUser,
                };
                res.status(200).send({status: 200, ...data});
                io.emit('new user in group', data);
            }
            else {
                const obj = {
                    status: 404,
                    message: `User ${name} does not exist.`,
                };
                res.status(404).send(obj);
            }
        });
        app.post('/edit-user-name-in-group', checkAuth, (req, res) => {
            const { id, userId, name } = req.body;
            const obj = { id, userId, name };
            db.get('groups')
                .getById(id)
                .get('users')
                .updateById(userId, {name})
                .write()
                .then(user => {
                    const obj = {
                        groupId: id,
                        user,
                    };
                    res.status(200).send({status: 200, ...obj});
                    io.emit('edit user name in group', obj);
                });
        });
        app.post('/delete-user-from-group', checkAuth, (req, res) => {
            const { id, userId } = req.body;
            const obj = { id, userId };
            db.get('groups')
                .getById(id)
                .get('users')
                .removeById(userId)
                .write()
                .then(user => {
                    const obj = {
                        groupId: id,
                        user,
                    };
                    res.status(200).send({status: 200, ...obj});
                    io.emit('delete user from group', obj);
                });
        });


        app.post('/register', (req, res) => {
            const { name, password } = req.body;
            const users = db.get('users');

            const user = users
                .find({name})
                .value();

            if (user) {
                const obj = {
                    status: 409,
                    message: `User ${name} is already registered.`,
                };
                res.status(409).send(obj);
            }
            else {
                const newUser = {
                    name,
                    password: encryptPassword(password),
                    created: Date.now(),
                };
                users.insert(newUser)
                    .write()
                    .then(user => {
                        req.session.user_id = user.id;
                        const obj = {
                            status: 200,
                            message: 'success',
                        };
                        res.status(200).send(obj);
                        // res.redirect('/');
                    });
            }
        });
        app.post('/login', (req, res) => {
            const { name, password } = req.body;
            const user = db.get('users')
                .find({name, password: encryptPassword(password)})
                .value();

            if (user) {
                req.session.user_id = user.id;
                const obj = {
                    status: 200,
                    message: 'success',
                };
                res.status(200).send(obj);
                // res.redirect('/');
            }
            else {
                const obj = {
                    status: 401,
                    message: 'User name or password is incorrect.',
                };
                res.status(401).send(obj);
            }
        });
        app.get('/logout', (req, res) => {
            delete req.session.user_id;
            res.redirect('/login.html');
        });
        app.get('/user-info', checkAuth, (req, res) => {
            const user = db.get('users')
                .getById(req.session.user_id)
                .value();

            if (user) {
                const obj = {
                    status: 200,
                    user: _.pick(user, ['id', 'name']),
                };
                res.status(200).send(obj);
            }
            else {
                const obj = {
                    status: 404,
                    message: 'Failed to get user info.',
                };
                res.status(404).send(obj);
            }
        });
        app.get('/groups', checkAuth, (req, res) => {
            const groups = db.get('groups')
                .value();

            res.status(200).send({status: 200, groups});
        });
        app.get('/group/:id', checkAuth, (req, res) => {
            db.get('groups')
                .getById(req.params.id)
                .value()
                .then(group => res.status(200).send({group}));
        });


        io.on('connection', function (socket) {
            socket.on('new message', function (msg) {
                const { id, message } = msg;
                const { name, text } = message;
                db.get('groups')
                    .getById(id)
                    .get('messages')
                    .insert({name, text})
                    .write()
                    .then(message => io.emit('new message', msg));
            });

            /*
            socket.on('new group', function (msg) {
                const { id, name, messages, users } = msg;
                db.get('groups')
                    .insert({id, name, messages, users});
                    .write()
                    .then(group => io.emit('new group', msg));
            });
            socket.on('edit group name', function (msg) {
                const { id, name } = msg;
                db.get('groups')
                    .updateById(id, {name})
                    .write()
                    .then(group => io.emit('edit group name', msg));
            });
            socket.on('delete group', function (msg) {
                const { id } = msg;
                db.get('groups')
                    .removeById(id)
                    .write()
                    .then(group => io.emit('delete group', msg));
            });
            socket.on('new user in group', function (msg) {
                const { id, userId, userName } = msg;
                db.get('users')
                    .getById(userId)
                    .value()
                    .then(user => {
                        if (user) {
                            db.get('groups')
                                .getById(id)
                                .get('users')
                                .insert({id: userId, name: userName})
                                .write()
                                .then(user => io.emit('new user in group', msg));
                        }
                        else {
                        }
                    });
            });
            socket.on('edit user name in group', function (msg) {
                const { id, userId, name } = msg;
                db.get('groups')
                    .getById(id)
                    .get('users')
                    .updateById(userId, {name})
                    .write()
                    .then(user => io.emit('edit user name in group', msg));
            });
            socket.on('delete user from group', function (msg) {
                const { id, userId } = msg;
                db.get('groups')
                    .getById(id)
                    .get('users')
                    .removeById(userId)
                    .write()
                    .then(user => io.emit('delete user from group', msg));
            });
            */
        });

        initRoutes();

        const data = {
            groups: [],
            users: [],
        };
        return db.defaults(data).write();
    })
    .then(() => {
        server.listen(port, () => console.log(`Server is running in ${nodeEnv} mode on port ${port}`));
    });
