'use strict';

module.exports = function(grunt){
	
	// Initialize Grunt
	grunt.initConfig({
		
		// Uglify Scripts
		uglify: {
			frameworks: {
				files: {
					'app/scripts/jquery.min.js': ['bower_components/jquery/dist/jquery.js'],
					'app/scripts/less.min.js': ['bower_components/less/dist/less-1.7.5.js'],
					'app/scripts/frame.min.js': [
						'bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
						'bower_components/bootstrap/dist/js/bootstrap.js'
					]
				}
			},
			angular: {
				files: {
					'app/scripts/angular.min.js': ['bower_components/angular/angular.js'],
					'app/scripts/angular.modules.min.js': [
							'bower_components/angular-route/angular-route.js',
							'bower_components/angular-loader/angular-loader.js',
							'bower_components/angular-mocks/angular-mocks.js',
							'bower_components/angular-resource/angular-resources.js',
							'bower_components/angular-animate/angular-animate.js'
						]
				}
			},
			versions: {
				files: {
					'app/scripts/versions.min.js': [
						'app/components/version/version.js',
						'app/components/version/version-directive.js',
						'app/components/version/interpolate-filter.js'
					]
				}
			},
			controllers: {
				files: {
					'app/scripts/controllers.min.js': ['app/components/source/controllers/**/*.js']
				}
			},
			scripts: {
				files: {
					'app/scripts/app.min.js': ['app/components/source/scripts/**/*.js']
				}
			}
		},
		
		// Concatenate CSS
		concat: {
			frameworks: {
				files: {
					'app/css/boilerplate.css': [
						'bower_components/html5-boilerplate/css/normalize.css',
						'bower_components/html5-boilerplate/css/main.css'
					],
					'app/css/bootstrap.css': [
						'bower_components/bootstrap/dist/css/bootstrap.css',
						'bower_components/bootstrap/dist/css/bootstrap-theme.css'
					]
				}
			},
			less: {
				files: {
					'app/css/app.less': ['app/components/source/css/**/*.less'],
				}
			}
		},
		
		// Minify CSS
		cssmin: {
			boilerplate: {
				src: 'app/css/boilerplate.css',
				dest: 'app/css/boilerplate.min.css'
			},
			bootstrap: {
				src: 'app/css/bootstrap.css',
				dest: 'app/css/bootstrap.min.css'
			},
			app: {
				src: 'app/css/app.less',
				dest: 'app/css/app.min.less'
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
	grunt.registerTask('default', ['uglify', 'concat', 'cssmin', 'watch']);
	
};