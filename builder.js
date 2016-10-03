var http = require('http');
const childProcess = require('child_process');
const config = require('./config.json');

function runScript() {
    var child = childProcess.spawn('sh', [ config.script ], {
        cwd: __dirname });
    child.stdout.on('data', function(data) {
        process.stdout.write(data.toString());
    });
    child.stderr.on('data', function(data) {
        process.stdout.write(data.toString());
    });
}

http.createServer(function (req, res) {
    runScript();

    res.end();
}).listen(config.port, config.ip);
console.log('Server running at: ' + config.ip + ':' + config.port);

