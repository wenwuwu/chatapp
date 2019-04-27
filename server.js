
const express = require('express');
const compression = require('compression');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

app.use(compression({filter: shouldCompress}))

function shouldCompress(req, res) {
    if (   req.headers['x-no-compression']
        || (/\.(png|jpg|gif|pdf)$/.test(req.path)) ) {
        return false;
    }
    return compression.filter(req, res);
};
function serveIndexPage (res) {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))    // Make sure don't cache it.
};

app.get('/', function (req, res){
    serveIndexPage(res);
})
app.get('/index.html', function (req, res){
    serveIndexPage(res);
})

// const cacheOpt = {maxAge: '1d'};
const cacheOpt = {};

if (isPro) {
    // app.use('/static', express.static(__dirname + '/build/static', {maxAge: '1y'} ));
    app.use(express.static(__dirname + '/build', cacheOpt));
}
else {
    app.use(express.static(__dirname + '/build'));
}

app.get('*', function (req, res){
    serveIndexPage(res);
})
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('error', { error: err });
});
console.log(`Server is running in ${nodeEnv} mode on port ${port}`);

app.listen(port);
