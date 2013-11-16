module.exports = function(grunt) {

  // Configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: ['js/src/app.js', 'js/src/controllers/*.js', 'js/src/directives/*.js', 'js/src/services/*.js', 'js/src/filters/*.js' ],
        dest: 'js/src/build/app.built.js'
      }
    },

    ngmin: {
      controllers: {
        src: ['js/src/build/app.built.js'],
        dest: 'js/src/build/app.built.annotate.js'
      }
    },

    jshint: {
      all: ['js/src/**/**.js']
    },

    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'js/app.min.js': ['js/src/build/app.built.annotate.js']
        }
      }
    }

  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Define your tasks here
  grunt.registerTask('concatme', ['concat']);
  grunt.registerTask('ngminme', ['ngmin']);
  grunt.registerTask('uglifyme', ['uglify']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['concat', 'ngmin', 'uglify']);

};