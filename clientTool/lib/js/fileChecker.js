'use strict';

var fs = require('fs');

var set = {};
var rootDir = '/Riot Games/League of Legends/Config';
var globalDir = rootDir + '/Global';
var champDir = rootDir + '/Champions';
var idCounter = 0;
var uidCache = [];
var files = {
    init: function () {
        var files = fs.readdirSync(rootDir);
        
        set.champ = (files.indexOf('Champions') >= 0);
        set.global = (files.indexOf('Global') >= 0);

        if (!set.champ) {
            fs.mkdirSync(champDir);
            set.champ = 'new';
        }
        if (!set.global) {
            fs.mkdirSync(globalDir);
            fs.mkdirSync(globalDir + '/Recommended');
        } else if (fs.readdirSync(globalDir).indexOf('Recommended') < 0) {
            fs.mkdirSync(globalDir + '/Recommended');
            set.global = 'new/Recommended';
        }
    },

    getItemSets: function () {
        var itemSets = {
            global: {},
            champs: {},
            unique: [],
            all: []
        };
        var globalSets = fs.readdirSync(globalDir + '/Recommended');
        for (var k = 0; k < globalSets.length; k++) {
            var fileNameG = globalSets[k].slice(0, globalSets[k].length - 5);
            var jsonG = fs.readFileSync(globalDir + '/Recommended'+ '/' +globalSets[k], {encoding: 'utf8'});
            itemSets.global[fileNameG] = JSON.parse(jsonG);
            itemSets.global[fileNameG]._id = idCounter++;
            if (itemSets.global[fileNameG].uid) {
                for (var i = 0; i < uidCache.length; i++) {
                    if (uidCache[i] === itemSets.global[fileNameG].uid) {
                        itemSets.global[fileNameG].copy = true;
                        break;
                    } else {
                        itemSets.global[fileNameG].copy = false;
                    }
                }
                console.log('checking: copy > ' + itemSets.global[fileNameG].copy)
                if (!itemSets.global[fileNameG].copy) {
                    uidCache.push(itemSets.global[fileNameG].uid);
                    itemSets.unique.push(itemSets.global[fileNameG]);
                }
            }
            itemSets.all.push(itemSets.global[fileNameG]);
        }

        var champs = fs.readdirSync(champDir);
        for (var c = 0; c < champs.length; c++) {
            var name = champs[c];
            var champPath = champDir + '/' + name + '/Recommended';
            var files = fs.readdirSync(champPath);
            if (files.length > 0) {
                itemSets.champs[name] = {};
                for (var j = 0; j < files.length; j++) {
                    var fileNameC = files[j].slice(0, files[j].length - 5);
                    var jsonC = fs.readFileSync(champPath+ '/' +files[j], {encoding: 'utf8'});
                    itemSets.champs[name][fileNameC] = JSON.parse(jsonC);
                    itemSets.champs[name][fileNameC]._id = idCounter++;
                    if (itemSets.champs[name][fileNameC].uid) {
                        for (var l = 0; l < uidCache.length; l++) {
                            if (uidCache[l] === itemSets.champs[name][fileNameC].uid) {
                                itemSets.champs[name][fileNameC].copy = true;
                                break;
                            } else {
                                itemSets.champs[name][fileNameC].copy = false;
                            }
                        }
                        if (!itemSets.champs[name][fileNameC].copy) {
                            uidCache.push(itemSets.champs[name][fileNameC].uid);
                            itemSets.unique.push(itemSets.champs[name][fileNameC]);
                        }
                    }
                    itemSets.all.push(itemSets.champs[name][fileNameC]);
                }
            }
        }
        return itemSets;
    }

};

module.exports = files;
