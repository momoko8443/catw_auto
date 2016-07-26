var exec = require('child_process').exec;
var schedule = require('node-schedule');
var fs = require('fs');
var job;
try {
    var cfg = JSON.parse(fs.readFileSync('./config.json'));
    job = runTask(cfg);
} catch (e) {
    console.error(e);
}



function runTask(cfg) {
    //{ hour: 14, minute: 30, dayOfWeek: 1 }
    return schedule.scheduleJob('*/10 * * * *', function () {
        callPhantomjs(cfg);
    });
}


function callPhantomjs(cfg) {
    var cmdStr = 'phantomjs phantom_script.js ' + cfg.address + ' ' + cfg.employeeId + ' "' + cfg.password + '"';
    exec(cmdStr, function (err, stdout, stderr) {
        if (err) {
            console.log('get weather api error:' + stderr);
        } else {
            console.log(stdout);
        }
    });
}