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

// OLD CODE FROM PURE MENU
UI.menu = {
    globalSets: $('#globalSets'),
    champSets: $('#champSets'),
    removeLoading: function () {
        $('#loading').remove();
    },
    // UI.menu.append('global', itemSet.title);
    appendItem: function (group, text, id) {
        var li = '<li class="pure-menu-item"> '+
            '<a href="#" id="'+ id +'" class="pure-menu-link">'+ text +'</a></li>';
        var $li = $(li);


        if (group === 'global') {
            $('#globalSets').append($li);
        } else {
            $('#champSet_'+group).append($li);
        }
    },


    appendGroup: function (name) {
        var header = $('<li id="champHeader_'+name+'" class="pure-menu-heading">'+name+'</li>');
        var group = $('<li id="champSet_'+name+'"></li>');

        this.champSets.append(group);
        group.before(header);
    }
};

UI.main = {
    main: $('#main'),
    show: function (itemSet) {
        var code = $('<code>' + JSON.stringify(itemSet, null, '\t').replace(/\n/g, '<br/>') +'</code>');
        this.main.html(code);
    }
};

UI.display = function (itemSet) {
    var code = $('<code>' + JSON.stringify(itemSet, null, '\t').replace(/\n/g, '<br/>') +'</code>');
    $('.content').html(code);
    $('.content').addClass('json');
    console.log(itemSet);
};

UI.nav = {
    LISTS: {
        main: [
            'My Item Sets',
            'Make New Item Set',
            'Import Item Set',
            'Export Item Set'
        ],
        myItemSets: [
            'Back',
            'Global',
            'Champion'
        ],
        myItemSetsGlobal: function () {
            return fish.file.getGlobalItemSets();
        },
        myItemSetsChampions: function () {
            return fish.file.getChampionsWithSets();
        },
        myItemSetsChampionItemsSets: function (champion) {
            return fish.file.getChampionItemSets(champion);
        }

    },



    setList: function (route) {
        console.log('UI::nav: Setting nav to ' + route);
        var listItems = [],
            list = this.LISTS[route];

        if (!Array.isArray(list)) {
            if (route.indexOf('#champion-') > -1) {
                list = this.LISTS.myItemSetsChampionItemsSets(route.split('-')[1]);
            } else {
                if (list === undefined) return;
                list = list(route);
            }
            list.unshift('back');
        }

        listItems = this.renderList(list);


        if (route === 'main') {
            listItems[0].on('click', function () {  fish.router('myItemSets');  });
            listItems[1].on('click', function () {  fish.router('makeNewItemSet');  });
            listItems[2].on('click', function () {  fish.router('importItemSet');  });
            listItems[3].on('click', function () {  fish.router('exportItemSet');  });

        } else if (route === 'myItemSets') {
            listItems[0].on('click', function () {  fish.router('main');  });
            listItems[1].on('click', function () {  fish.router('myItemSetsGlobal');  });
            listItems[2].on('click', function () {  fish.router('myItemSetsChampions');  });

        } else if (route === 'myItemSetsGlobal') {

            listItems[0].on('click', function () {  fish.router('myItemSets');  });
            var globalItemSetClick = function () { 
                var itemSetName = $(this).find('a').html();
                var newRoute = route + '#global/' + itemSetName;
                fish.router(newRoute);       
            };

            for (var i = 1; i < listItems.length; i++) {
                listItems[i].on('click', globalItemSetClick);
            }

        } else if (route === 'myItemSetsChampions') {
            listItems[0].on('click', function () {  fish.router('myItemSets');  });
            var championClick = function () { 
                var championName = $(this).find('a').html();
                var newRoute = route + '#champion-' + championName;
                fish.router(newRoute);
            };

            for (var i = 1; i < listItems.length; i++) {
                listItems[i].on('click', championClick);
            }
        } else if (route.indexOf('#champion-') > -1) {
            listItems[0].on('click', function () {  fish.router('myItemSetsChampions');  });
            var championItemSetClick = function () {
                var itemSetName = $(this).find('a').html();
                var newRoute = route + '/' + itemSetName;
                fish.router(newRoute);
            };

            for (var i = 1; i < listItems.length; i++) {
                listItems[i].on('click', championItemSetClick);
            }
        }
    },

    
    renderList: function (nameArray) {
        var sideNav = $('#slide-out'),
            listItems = [],
            item = {};
            
        sideNav.html('');
        for (var i = 0; i < nameArray.length; i++) {
            item = $('<li><a href="#!">' + nameArray[i] + '</a></li>');
            sideNav.append(item);
            listItems.push(item);
        }
        return listItems;
    },

    init: function () {

    }
};