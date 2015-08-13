module.exports = function (grunt){
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nw-builder');

    grunt.initConfig({
        nwjs: {
            options: {
                platforms: ['win', 'linux'],
                buildDir: './builds'
            },
            src: ['./clientTool/**/*']
        },

        watch: {
            main: {
                files: ['./clientTool/**'],
                tasks: ['nwjs']
            }
        }
    });

    grunt.registerTask('default', 'nwjs');
};