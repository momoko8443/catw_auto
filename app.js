var exec = require('child_process').exec;
var schedule = require('node-schedule');
var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();
var port = process.env.EXPRESS_PORT || 3000;
app.use(express.static(path.join(__dirname,'snapshot')));
app.listen(port,function(){
    console.log('catw_auto on port %d', port);
});
var job;
try {
    var cfg = JSON.parse(fs.readFileSync('./config.json'));
    job = runTask(cfg);
} catch (e) {
    console.error(e);
}



function runTask(cfg) {
    callPhantomjs(cfg);

    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [1,3,5];
    rule.hour = 17;
    rule.minute = 30;
    return schedule.scheduleJob(rule, function () {
        callPhantomjs(cfg);
    });
}


function callPhantomjs(cfg) {
    var cmdStr = 'phantomjs --ignore-ssl-errors=true --proxy=web-proxy.jpn.hp.com:8080 phantom_script.js ' + ' "' + cfg.address + '" ' + cfg.employeeId + ' "' + cfg.password + '"';
    exec(cmdStr, function (err, stdout, stderr) {
        if (err) {
            console.log('get cmd errout:' + stderr);
        } else {
            console.log(stdout);
        }
    });
}