var page = require('webpage').create();
var system = require('system');
var address;
var username;// = "60075098";
var password;// = "qwe123&*(";
if (system.args.length !== 4) {
    phantom.exit(1);
} else {
    address = system.args[1];
    username = system.args[2];
    password = system.args[3];
    console.log(password);
    //phantom.exit(1);
}


page.viewportSize = { width: 1600, height: 900 };
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = true;//Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

//var home_url = "https://g4u2848.houston.hpecorp.net:4106/hps-ic-red(bD16aCZjPTgwMCZ0PVpIUFNfSUM=)/default.htm";

page.onError = function (msg, trace) {
    console.log("error: " + msg);
    trace.forEach(function (item) {
        //console.log('  ', item.file, ':', item.line);
    });
};


var steps_1 = [login, time_entry, time_entry_continue, save_timesheet];

run_step(steps_1, 0);

function run_step(steps, index) {
    //var self = this;
    if (steps.length > index) {
        window.setTimeout(function () {
            if (index > 0) {
                page.render("./snapshot/" + index + ".png");
            }
            if(index === 0){
                steps[index].call(null,username,password);
            }else{
                steps[index].call(null);
            }
            
            console.log("function called " + index);
            index++;
            run_step(steps, index);
        }, 30000);
    } else {
        window.setTimeout(function () {
            page.render("./snapshot/" + index + ".png");
            phantom.exit();
        }, 10000);
    }
}

function login(username,password) {
    var self = this;
    page.open(address, function (status) {
        if (status == 'success') {
            page.evaluate(function (user,pwd) {
                document.getElementById("sap-client").value = "800";
                document.getElementById("sap-user").value = user;
                document.getElementById("sap-password").value = pwd;
                document.getElementById("sap-language").value = "ZH";
                document.getElementById("sap-language-dropdown").value = "Chinese";
            },username,password);
            page.evaluate(function () {
                document.getElementById("LOGON_BUTTON").click();
            });
        } else {
            console.log(status);
            phantom.exit();
        }
    });
}

function display_time_entry() {
    page.evaluate(function () {
        window.frames['list'].document.getElementById("Disply_timeentries").click();
    });
}

function time_entry() {
    page.evaluate(function () {
        window.frames['list'].document.getElementById("time_entry").click();
    });
}

function time_entry_continue() {
    page.evaluate(function () {
        window.frames['right'].document.getElementById("callprivacy").click();
    });
}

function save_timesheet() {
    page.evaluate(function () {
        window.frames['right'].document.getElementById("SaveButton").click();
    });
}

/*function report(){
    page.evaluate(function(){
        window.frames['right'].document.getElementById("btn_display").click();
    });
    window.setTimeout(function() {
        page.render('report.png');
        

        var result = page.evaluate(function(){
            var trs = window.frames['right'].document.querySelectorAll("table[id='final'] table tr[rr]");
            var row = [];
            for(var i=1;i<trs.length;i++){
                var rowItem = [];
                var tr = trs[i];
                for(var j=0;j<tr.childNodes.length;j++){
                    var td = tr.childNodes[j];
                    var txt = td.querySelector("div span").innerText;
                    rowItem.push(txt);
                }
                row.push(rowItem);
            }
            return JSON.stringify(row);
        });
        page.render('report2.png');
        var system = require('system');

        system.stdout.write('Hello, system.stdout.write!' + result);
        phantom.exit();
    },10000);
}*/