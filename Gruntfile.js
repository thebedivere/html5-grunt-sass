module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded'
				},
				files: {                         // Dictionary of files
					'style.css': 'src/scss/main.scss'       // 'destination': 'source'
				}
			}
		},
		uglify: {
			all: {
				files: {
					'js/**.min.js': ['js/**.js']
				},
				options: {
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %>\n' +
				' * <%= pkg.homepage %>\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
				' * Licensed MIT' +
				' */\n'
			},
			minify: {
				expand: true,

				cwd: '',
				src: ['style.css'],

				dest: '',
				ext: '.min.css'
			}
		},
		watch: {
			files: ['src/scss/**.scss', 'src/scss/**/**.scss', 'js/**.js',],
			tasks: ['sass', 'cssmin']
		},
		clean: {
			main: ['release/<%= pkg.version %>']
		},
		copy: {
			// Copy the plugin to a versioned release directory
			main: {
				src: [
					'**',
					'!node_modules/**',
					'!release/**',
					'!.git/**',
					'!.sass-cache/**',
					'!css/src/**',
					'!js/src/**',
					'!img/src/**',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!base/**',
					'!bourbon/**',
					'!neat/**',
					'!.gitmodules'
				],
				dest: 'release/<%= pkg.version %>/'
			}
		},
		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './release/<%= pkg.name %>.<%= pkg.version %>.zip'
				},
				expand: true,
				cwd: 'release/<%= pkg.version %>/',
				src: ['**/*'],
				dest: 'creative_portal/'
			}
		},
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.registerTask('build', ['sass', 'compress', 'clean', 'copy', 'compress']);
	grunt.registerTask('default', ['sass', 'watch']);

};
