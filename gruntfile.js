'use strict';

module.exports = function(grunt){
	
	// Initialize Grunt
	grunt.initConfig({
		
		// Uglify
		uglify: {
			frameworks: {
				files: {
					'app/scripts/jquery.min.js': ['bower_components/jquery/dist/jquery.js'],
					'app/scripts/angular.min.js': ['bower_components/angular/angular.js'],
					'app/scripts/angular.modules.min.js': [
						'bower_components/angular-route/angular-route.js',
						'bower_components/angular-loader/angular-loader.js',
						'bower_components/angular-mocks/angular-mocks.js',
						'bower_components/angular-resource/angular-resource.js',
						'bower_components/angular-animate/angular-animate.js'],
					'app/scripts/frame.min.js': [
						'bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
						'bower_components/bootstrap/dist/js/bootstrap.js']
				}
			},
			scripts: {
				files: {
					'app/scripts/app.min.js': ['app/components/scripts/**/*.js']
				}
			}
		},
		
		// Concatenate
		concat: {
			frameworks: {
				files: {
					'app/styles/frame.css': [
						'bower_components/html5-boilerplate/css/normalize.css',
						'bower_components/html5-boilerplate/css/main.css',
						'bower_components/bootstrap/dist/css/bootstrap.css',
						'bower_components/bootstrap/dist/css/bootstrap-theme.css']
				}
			},
			less: {
				files: {
					'app/styles/app.less': ['app/components/styles/**/*.less']
				}
			},
			controllers: {
				files: {
					'app/scripts/controllers.js': ['app/components/controllers/**/*.js']
				}
			}
		},
		
		// Compile
		less: {
			dist: {
				options: {
					paths: ['app/styles'],
					cleancss: true
				},
				files: {
					'app/styles/app.min.css': 'app/styles/app.less'
				}
			}
		},
		
		// Minify 
		cssmin: {
			frameworks: {
				src: 'app/styles/frame.css',
				dest: 'app/styles/frame.min.css'
			}
		},
		
		// Watch
		watch: {
			files: [
				'app/components/controllers/*',
				'app/components/routes/*',
				'app/components/scripts/*',
				'app/components/styles/*',
				'app/components/version/*'
			],
			tasks: ['uglify', 'concat', 'less', 'cssmin']
		}
		
	});
	
	// Load NPM Contributions
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	
	// Register Grunt Tasks
	grunt.registerTask('default', ['uglify', 'concat', 'less', 'cssmin', 'watch']);
	
};

