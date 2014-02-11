/*
 *
 */


module.exports = function(grunt) {
    
    var pkg = grunt.file.readJSON('package.json');
    var banner = '\
/*\n\
 * ぴよ川タッチ <%= version %>\n\
 * MIT Licensed\n\
 * \n\
 * Copyright (C) 2010 flowork, http://flowork.me\n\
 */\n\n\
';
    
    var target = [
        "plugins/tmlib.js",
        "plugins/tmlib.native.js",
        "scripts/constant.js",
        "scripts/resultscene.js",
        "scripts/main.js",
    ];

    grunt.initConfig({
        version: pkg.version,

        concat: {
            main: {
                src: target,
                dest: 'build/all.js',
                options: {
                    banner: banner,
                },
            },
        },
        uglify: {
            main: {
                options: {},
                files: {
                    'build/all.min.js': 'build/all.js',
                }
            }
        },

        jade: {
            "native": {
                options: {
                    pretty: true,
                    data: function(dest, src) {
                        return {
                            debug: true,
                            pageTitle: "ぴよ川タッチ",
                            assets: grunt.file.read('build/assets.json'),
                            script: grunt.file.read('build/all.js'),
                        };
                    },
                },
                files: {
                    "native.html": "templates/native.jade",
                },
            },
            web: {
                options: {
                    pretty: true,
                    data: function(dest, src) {
                        return {
                            debug: true,
                            pageTitle: "ぴよ川タッチ",
                            assets: grunt.file.read('build/assets.json'),
                            scripts: target,
                        };
                    },
                },
                files: {
                    "web.html": "templates/web.jade",
                },
            },
        },
    });

    for (var key in pkg.devDependencies) {
        if (/grunt-/.test(key)) {
            grunt.loadNpmTasks(key);
        }
    }
    grunt.task.loadTasks("tasks");

    grunt.registerTask('default', ['concat', 'uglify', 'base64', 'jade']);
};
