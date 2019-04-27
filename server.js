const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const low = require('lowdb');
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
    app.get('/login.html', function (req, res){
        res.sendFile(path.resolve(__dirname, 'build', 'login.html'));
    })
    app.get('/index.html', function (req, res){
        serveIndexPage(res);
    })
    app.get('*', function (req, res){
        serveIndexPage(res);
    })
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500);
        res.render('error', { error: err });
    });
}

const adapter = new FileAsync('db.json');

low(adapter)
    .then(db => {
        db._.mixin(lodashId);

        app.post('/new-group', checkAuth, (req, res) => {
            const { id, name, messages, users } = req.body;
            const obj = { id, name, messages, users };
            db.get('groups')
                .insert(obj);
                .write()
                // .then(group => res.status(200).send({group}));
                .then(group => io.emit('new group', obj));
        });
        app.post('/edit-group-name', checkAuth, (req, res) => {
            const { id, name } = req.body;
            const obj = { id, name };
            db.get('groups')
                .updateById(id, {name})
                .write()
                // .then(group => res.status(200).send({group}));
                .then(group => io.emit('edit group name', obj));
        });
        app.post('/delete-group', checkAuth, (req, res) => {
            const { id } = req.body;
            db.get('groups')
                .removeById(id)
                .write()
                // .then(group => res.status(200).send({group}));
                .then(group => io.emit('delete group', { id }));
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
            const { id, userName } = req.body;

            db.get('users')
                .find({userName})
                .value()
                .then(user => {
                    if (user) {
                        const obj = {id: user.id, name: userName};
                        db.get('groups')
                            .getById(id)
                            .get('users')
                            .insert(obj)
                            .write()
                            .then(user => io.emit('new user in group', obj));
                    }
                    else {
                        res.status(404).send(`User ${userName} does not exist.`);
                    }
                });
        });
        app.post('/edit-user-name-in-group', checkAuth, (req, res) => {
            const { id, userId, name } = req.body;
            const obj = { id, userId, name };
            db.get('groups')
                .getById(id)
                .get('users')
                .updateById(userId, {name})
                .write()
                // .then(user => res.status(200).send({user}));
                .then(user => io.emit('edit user name in group', obj));
        });
        app.post('/delete-user-from-group', checkAuth, (req, res) => {
            const { id, userId } = req.body;
            const obj = { id, userId };
            db.get('groups')
                .getById(id)
                .get('users')
                .removeById(userId)
                .write()
                // .then(user => res.status(200).send({user}));
                .then(user => io.emit('delete user from group', obj));
        });


        app.post('/register', (req, res) => {
            const { name, password } = req.body;
            const users = db.get('users');

            users
                .find({name})
                .value()
                .then(user => {
                    if (user) {
                        res.status(409).send(`User ${name} is already registered.`);
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
                                res.redirect('/index.html');
                            });
                    }
                });
        });
        app.post('/login', (req, res) => {
            const { name, password } = req.body;
            const users = db.get('users');

            users
                .find({name, password: encryptPassword(password)})
                .value()
                .then(user => {
                    if (user) {
                        req.session.user_id = user.id;
                        res.redirect('/index.html');
                    }
                    else {
                        res.status(401).send('User name or password is incorrect.');
                    }
                });
        });
        app.get('/logout', (req, res) => {
            delete req.session.user_id;
            res.redirect('/login.html');
        });
        app.get('/user-info', checkAuth, (req, res) => {
            db.get('users')
                .getById(req.session.user_id)
                .value()
                .then(user => res.status(200).send({user}));
        });
        app.get('/groups', checkAuth, (req, res) => {
            db.get('groups')
                .value()
                .then(groups => res.status(200).send({groups}));
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
