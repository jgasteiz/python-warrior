module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dev: {
				options: {
					style: "expanded"
				},
				files: {
					'app/css/styles.css': 'app/scss/python-warrior.scss'
				}
			}
		},
		watch: {
			dev: {
				files: ['app/scss/**/*.scss'],
				tasks: ['sass:dev', 'notify:css']
			}
		},
		notify: {
			css: {
				options: {
					title: 'Task Complete',
					message: 'CSS is ready'
				}
			}
		},
		concurrent: {
			watch: {
				tasks: ['watch:dev'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		copy: {
			main: {
				files: [
					// jQuery
					{
						expand: true,
						src: [
							'bower_components/jquery/*.min.js',
							'bower_components/jquery/*.min.map'
						],
						dest: 'app/js/vendor/jquery',
						flatten: true,
						filter: 'isFile'
					},
					// Underscore
					{
						expand: true,
						src: [
							'bower_components/underscore/*-min.js',
							'bower_components/underscore/*-min.map'
						],
						dest: 'app/js/vendor/underscore',
						flatten: true,
						filter: 'isFile'
					},
					// Backbone
					{
						expand: true,
						src: [
							'bower_components/backbone/*-min.js',
							'bower_components/backbone/*-min.map'
						],
						dest: 'app/js/vendor/backbone',
						flatten: true,
						filter: 'isFile'
					},
					// Skulpt
					{
						expand: true,
						src: [
							'bower_components/skulpt/*.min.js'
						],
						dest: 'app/js/vendor/skulpt',
						flatten: true,
						filter: 'isFile'
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['copy', 'sass:dev', 'concurrent:watch']);
};