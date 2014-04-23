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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['sass:dev', 'concurrent:watch']);
};