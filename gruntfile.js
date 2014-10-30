'use strict';

module.exports = function(grunt){

	/*
	--------- October 20th --------
	No longer fetches the following files:
		1. bootstrap.js
		2. HTML5 Boilerplate Files

	*/

	// Start Grunt Tasks
	grunt.initConfig({

		// Copy
		copy: {

			// Libraries
			libraries: {
				src: [
					'bower_components/angular/angular.min.js',
					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/jquery-ui/jquery-ui.min.js',
					'bower_components/angular-route/angular-route.js'
				],
				dest: 'app/scripts/',
				expand: true,
				flatten: true
			},

			// Reset
			reset: {
				src: 'bower_components/reset-css/reset.css',
				dest: 'app/styles',
				expand: true,
				flatten: true,
				filter: 'isFile'
			},

			// Less
			less: {
				src: [
					'bower_components/font-awesome/less/*',
					'!**/font-awesome.less**',
					'!**/variables.less**'],
				dest: 'app/resources/template',
				expand: true,
				flatten: true,
				filter: 'isFile'
			},

			// Fonts
			fonts: {
				src: 'bower_components/font-awesome/fonts/*',
				dest: 'app/resources/fonts',
				expand: true,
				flatten: true,
				filter: 'isFile'
			}

		},

		// Uglify
		uglify: {

			// Angular
			angular: {
				src: [
					'bower_components/angular-route/angular-route.min.js',
					'bower_components/angular-resource/angular-resource.min.js',
					'bower_components/angular-animate/angular-animate.min.js',
					'bower_components/angular-loader/angular-loader.min.js',
					'bower_components/angular-mocks/angular-mocks.js'
				],
				dest: 'app/scripts/modules.min.js'
			},

			// Modernizr
			modernizr: {
				src: 'bower_components/modernizr/modernizr.js',
				dest: 'app/scripts/modernizr.min.js'
			},

			// Application
			application: {
				options: {mangle: false},
				files: {
					'app/scripts/app.min.js': ['app/components/scripts/**/*.js']
				}
			}

		},

		// Concat
		concat: {

			// Controllers
			controllers: {
				src: 'app/components/controllers/**/*.js',
				dest: 'app/scripts/controllers.js'
			},

			// Bootstrap
			bootstrap: {
				src: [
					'bower_components/bootstrap/dist/css/bootstrap.min.css',
					'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
				],
				dest: 'app/styles/bootstrap.min.css'
			},

			// Application
			application: {
				src: [
					'app/components/styles/**/*.less',
					'app/resources/template/**/*.less'
				],
				dest: 'app/resources/less/app.less'
			}

		},

		// Less
		less: {

			// Application
			application: {
				options: {
					paths: ['app/styles'],
					cleancss: true
				},
				files: {'app/styles/app.min.css': 'app/resources/less/app.less'}
			}

		},

		// Watch
		watch: {

			// Controllers
			controllers: {
				files: 'app/components/controllers/*',
				tasks: ['concat:controllers']
			},

			// Scripts
			scripts: {
				files: 'app/components/scripts/*',
				tasks: ['uglify:application']
			},

			// Styles
			styles: {
				files: 'app/components/styles/*',
				tasks: ['concat:application', 'less:application']
			}

		}

	});

	// Load Grunt Modules
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register Grunt Tasks
	grunt.registerTask('default', ['uglify', 'concat', 'less', 'watch']);
	grunt.registerTask('init', ['copy', 'uglify', 'concat', 'less', 'watch']);

};
