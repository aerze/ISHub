module.exports = function (grunt){
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nw-builder');

    grunt.initConfig({
        nwjs: {
            options: {
                version: '0.12.3',
                platforms: ['win64'],
                buildDir: './builds'
            },
            src: ['./client/dist/**/*']
        },

        watch: {
            main: {
                files: ['./client/dist/**'],
                tasks: ['nwjs']
            }
        }
    });

    grunt.registerTask('default', 'nwjs');
};