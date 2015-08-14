'use strict';

$(document).on('ready', function () {

    var fileChecker = require('./lib/js/fileChecker');
    fileChecker.init();
    
    var LOCAL_ITEM_SETS = fileChecker.getItemSets();
    var ITEMSET_ID_COUNTER = 0;
    window.LOCAL_ITEM_SETS = LOCAL_ITEM_SETS;
    

    UI.menu.removeLoading();

    _.each(LOCAL_ITEM_SETS.global, function (itemSet, fileName) {
        itemSet.ISHUB_ID = ITEMSET_ID_COUNTER++;
        UI.menu.appendItem('global', itemSet.title, itemSet.ISHUB_ID);
    });

    _.each(LOCAL_ITEM_SETS.champs, function (champ, champName) {
        UI.menu.appendGroup(champName);
        _.each(champ, function (itemSet, fileName) {
            itemSet.ISHUB_ID = ITEMSET_ID_COUNTER++;
            UI.menu.appendItem(champName, itemSet.title, itemSet.ISHUB_ID);
        });
    });

    $('a.pure-menu-link').on('click', function(e) {
        e.preventDefault();

        UI.main.show(LOCAL_ITEM_SETS.all[this.id]);
    });
});