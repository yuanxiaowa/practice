module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	console.log('message');
	var config = {
		app: './src',
		dist: './dist'
	}
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: config,
		stylus: {
			options: {
				compress: false
			},
			compile: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/css/',
                    src: ['*.styl', '!{reset,common,mixin,ie}.styl'],
                    dest: '<%= config.dist %>/css/',
                    ext: '.css',
                    flatten: true
				}]
			}
		},
        jade: {
            options: {
                pretty: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/views/',
                    src: '*.jade',
                    dest: '<%= config.dist %>/views/',
                    ext: '.html',
                    flatten: true
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            build: {
                expand: true,
                cwd: '<%= config.dist %>/css/',
                src: ['*.css', '!reset.css'],
                dest: '<%= config.dist %>/css/'
            }
        },
        connect: {
            options: {
                post: 80,
                open: false,
                hostname: '0.0.0.0',
                base: ['<%= config.dist %>']
            },
            livereload: {
                options: {
                    middleware: function(connect, options) {
                        var arr = [
                            connect().use('/', connect.static(options.base[0] + '/views')),
                            connect().use('./bower_components', connect.static('../bower_components')),
                        ];
                        var _arr = ['scripts', 'css', 'image'];
                        for (var _i in _arr) {
                            arr.push(connect().use('/' + _arr[_i], connect.static(options.base[0] + '/' + _arr[_i])));
                        }
                        return arr;
                    }
                }
            }

        },
        watch: {
        	stylus: {
        		tasks: ['css'],
        		files: ['<%= config.app %>/css/**/*.styl']
        	},
            jade: {
                tasks: ['jade'],
                files: ['<%= config.app %>/views/**/*.jade']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: ['<%= config.dist %>/{views,scripts,css}/**/*']
            }
        }
	});
	grunt.option('force', true);
	grunt.registerTask('css', ['stylus', 'autoprefixer']);
	grunt.registerTask('build', ['css', 'jade']);
	grunt.registerTask('default', ['build', 'connect', 'watch']);
};