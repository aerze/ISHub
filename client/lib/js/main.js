'use strict';

$(document).on('ready', function () {

    var fileChecker = require('./lib/js/fileChecker');
    fileChecker.init();
    window.LOCAL_ITEM_SETS = fileChecker.getItemSets();
    
});


var fish = {};

fish.router = function(route) {
    console.log('fish::router: ' + route);
    if (route === 'makeNewItemSet') {
        $('.button-collapse').sideNav('hide');

    } else if (route === 'makeNewItemSet') {
        $('.button-collapse').sideNav('hide');

    } else if (route === 'importItemSet') {
        $('.button-collapse').sideNav('hide');

    } else if (route === 'exportItemSet') {
        $('.button-collapse').sideNav('hide');

    } else if (route.indexOf('/') > -1) {
        $('.button-collapse').sideNav('hide');

        var _id = parseInt(route.split(':')[1], 10);
        console.log(_id);
        var all = LOCAL_ITEM_SETS.all;
        for (var i = all.length - 1; i >= 0; i--) {
            console.log(all[i]._id, _id);
            if (all[i]._id === _id) {
                console.log(all[i]);
                UI.display(all[i]);
                break;
            }
        }
    } else {
        UI.nav.setList(route);
    }
};

fish.file = {
    getGlobalItemSets: function () {
        var results = [];
        var cache = [];
        var save = function (itemSet) {
            results.push(itemSet.title + ' ID:' + itemSet._id);
            cache.push(itemSet);
        };
        for (var i = 0; i < LOCAL_ITEM_SETS.all.length; i++) {
            var itemSet = LOCAL_ITEM_SETS.all[i];
            if (itemSet.isGlobalForChampions) {
                if (results.length === 0) {
                    save(itemSet);
                } else {
                    var match = false;
                    for (var j = 0; j < cache.length; j++) {
                        var checkSet = cache[j];
                        console.log(itemSet.title, checkSet.title);
                        console.log(itemSet.blocks === checkSet.blocks);
                        console.log('\n\n');
                        if (itemSet.blocks === checkSet.blocks) match = true;
                        if (itemSet.uid === checkSet.uid) match = true;

                    }
                    if (!match) save(itemSet);
                }
            }
        }
        return results;
    },
    getChampionsWithSets: function () {
        var results = [];
        if (LOCAL_ITEM_SETS.champs) {
            for (var name in LOCAL_ITEM_SETS.champs) {
                results.push(name);
            }
        }
        return results;
    },
    getChampionItemSets: function (champion) {
        var results = [];
        if (LOCAL_ITEM_SETS.champs[champion]) {
            for (var key in LOCAL_ITEM_SETS.champs[champion]) {
                var itemSet = LOCAL_ITEM_SETS.champs[champion][key];
                results.push(itemSet.title + ' ID:' + itemSet._id);
            }
        }
        return results;
    }
};