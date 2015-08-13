'use strict';
var manifest = gui.App.manifest;
document.title += ' v' + manifest.version;

var UI = UI || {};
UI = {
    textarea: document.getElementsByTagName('textarea')[0],
    buttons: {
        dev: document.getElementById('button_dev'),
        close: document.getElementById('button_close'),
        restore: document.getElementById('button_restore'),
        min: document.getElementById('button_min'),
        browse: document.getElementById('button_browse'),
        history: document.getElementById('button_history'),
        start: document.getElementById('button_start'),
        stop: document.getElementById('button_stop')
    },
    inputDir: document.getElementById('input_directory'),
    span: document.getElementById('span_workingDir'),
    title: document.getElementById('title')
};

UI.title.innerText = document.title;
UI.enableButton = function (key) {
    var elem = UI.buttons[key];
    elem.classList.remove('pure-button-disabled');
};

UI.disableButton = function (key) {
    var elem = UI.buttons[key];
    elem.classList.add('pure-button-disabled');
};

UI.warn= function (string) {
    log(string);
    alert(string);
};

UI.buttons.dev.onclick = function () {
    win.showDevTools();
};

UI.buttons.close.onclick = function () {
    win.close();
};

UI.buttons.min.onclick = function () {
    win.minimize();
};
