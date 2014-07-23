module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      css: ['dest/css','public/css/'],
      js: ['dest/js','public/js/'],
    },

    copy: {
      js: {
        files: [
          {src: ['assets/js/app/app.js'], dest: 'dest/js/all/7.js', filter: 'isFile'},
        ]
      },

      css: {
        files: [
          {expand: true, flatten: true, src: ['assets/css/**'], dest: 'dest/css/all/', filter: 'isFile'},
        ]
      }
    },

    concat: {

      vendor: {
        src: ['assets/js/vendor/jquery-1.11.1.min.js','assets/js/vendor/underscore-min.js','assets/js/vendor/backbone-min.js','assets/js/vendor/moment.min.js','assets/js/vendor/handlebars.min.js','assets/js/vendor/bootstrap.min.js','assets/js/vendor/bootstrap-dialog.min.js'],
        dest: 'dest/js/all/1.js'
      },

      app_utils: {
        src: ['assets/js/app/util/*.js'],
        dest: 'dest/js/all/2.js'
      },

      app_models: {
        src: ['assets/js/app/model/*.js'],
        dest: 'dest/js/all/3.js'
      },

      app_collections: {
        src: ['assets/js/app/collection/*.js'],
        dest: 'dest/js/all/4.js'
      },

      app_views: {
        src: ['assets/js/app/view/*.js'],
        dest: 'dest/js/all/5.js'
      },

      app_router: {
        src: ['assets/js/app/router/*.js'],
        dest: 'dest/js/all/6.js'
      },

      all: {
        src: ['dest/js/all/*.js'],
        dest: 'dest/js/concat/concat.js'
      },

      css: {
        src: 'dest/css/all/*.css',
        dest: 'dest/css/concat/concat.css'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/js/output.min.js': ['dest/js/concat/concat.js']
        }
      }
    },

    cssmin: {
      minify: {
        files: {
          'public/css/output.min.css': ['dest/css/concat/concat.css']
        }
      }
    },


    watch: {
      js: {
        files: ['assets/js/app/**/*.js','assets/js/vendor/*.js'],
        tasks: ['clean:js','copy:js','concat:vendor','concat:app_utils','concat:app_models','concat:app_collections','concat:app_views','concat:app_router','concat:all','uglify']
      },
      css: {
         files: 'assets/css/*.css',
         tasks: ['clean:css','copy:css','concat:css','cssmin']
      },
    },


  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean','copy','concat','uglify','cssmin']);

};