/**
 * Created by Donghui Huo on 2015/5/28.
 */
module.exports = function (grunt) {
    var
        shims = require("./public/js/dev/self/shims"),
        sharedModules = Object.keys(shims);
    grunt.config.init({
        'compass': {
            dev: {
                options: {
                    force: true,
                    sassDir: ['scss'],
                    cssDir: ['public/css'],
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    force: true,
                    sassDir: ['scss'],
                    cssDir: ['public/css'],
                    environment: 'production'
                }
            }
        },
        'copy': {
            once: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/masonry-layout/dist/masonry.pkgd.js'],
                        dest: 'public/js/dev/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/jquery-colorbox/example5/*'],
                        dest: 'public/css/jquery-colorbox/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/jquery-colorbox/example5/images/*'],
                        dest: 'public/css/jquery-colorbox/images/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css'],
                        dest: 'public/css/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/bootstrap-sass/assets/fonts/bootstrap/*'],
                        dest: 'public/fonts/bootstrap/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        browserify: {
            //http://aeflash.com/2014-05/grunt-browserify-2-x-update.html
            options: {
                transform: [require('grunt-react').browserify, "browserify-shim"]
            },
            react: {
                src: ['public/js/dev/self/jsx/*.jsx'],
                dest: 'public/js/dev/self/react-js.js',
                options: {
                    transform: [require('grunt-react').browserify, "browserify-shim"]
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/js/all.min.js': ['public/js/dev/self/react-js.js'],
                    'public/js/masonry.pkgd.min.js': ['public/js/dev/masonry.pkgd.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('build', "Builds the application.",
        ['compass:prod','browserify:react', 'uglify']);
}