'use strict';

module.exports = function (grunt) {

	// Initialize Grunt
	grunt.initConfig({
	
		// Uglify Scripts
		uglify: {
			scripts: {
				files: {
					'app/scripts/angular.min.js': [
						'bower_components/angular/angular.js',
						'bower_components/angular-route/angular-route.js',
						'bower_components/angular-loader/angular-loader.js',
						'bower_components/angular-mocks/angular-mocks.js',
						'bower_components/angular-resource/angular-resources.js',
						'bower_components/angular-animate/angular-animate.js'
					],
					'app/scripts/frame.min.js': [
						'bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
						'bower_components/bootstrap/dist/js/bootstrap.js',
						'bower_components/jquery/dist/jquery.js'
					],
					'app/scripts/controllers.min.js': [
						'app/views/view1/view1.js',
						'app/views/view2/view2.js'
					],
					'app/scripts/version.min.js': [
						'app/components/version/version.js',
						'app/components/version/version-directive.js',
						'app/components/version/interpolate-filter.js'
					],
					'app/scripts/app.min.js': ['app/components/source/scripts/**/*.js']
				}	
			}
		},
		
		// Concatenate Styles
		concat: {
			css: {
				files: {
					'app/css/frame.css': [
						'bower_components/html5-boilerplate/css/normalize.css',
						'bower_components/html5-boilerplate/css/main.css',
						'bower_components/bootstrap/dist/css/bootstrap.css',
						'bower_components/bootstrap/dist/css/bootstrap-theme.css'
					],
					'app/css/app.css': ['app/components/source/css/**/*.css']
				}
			}
		},
		
		// Minify Styles
		cssmin: {
			framecss: {
				src: 'app/css/frame.css',
				dest: 'app/css/frame.min.css'
			},
			appcss: {
				src: 'app/css/app.css',
				dest: 'app/css/app.min.css'
			}
		},
		
		// Watch Directories
		watch: {
			files: ['app/components/source/scripts/*', 'app/components/source/css/*'],
			tasks: ['uglify', 'concat', 'cssmin']
		}
			
	});
	
	// Load NPM Contributions
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Register Grunt Tasks
	grunt.registerTask('default', ['uglify', 'concat', 'cssmin']);
		
};