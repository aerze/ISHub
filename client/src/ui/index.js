
var manifest = gui.App.manifest;
var ui = {
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
    title: document.getElementById('title')
};

document.title += ' v' + manifest.version;

ui.title.innerText = document.title;

ui.buttons.dev.onclick = function () {
    win.showDevTools();
};

ui.buttons.close.onclick = function () {
    win.close();
};

ui.buttons.min.onclick = function () {
    win.minimize();
};

module.exports = ui;