module.exports = function (grunt) {
  'use strict';

  var sourceJs = [
    'src/range.js'
  ];

  var sourceCss = [
    'src/range.css'
  ];

  grunt.initConfig({
    clean: {
      test: ['build/range.test.js']
    },

    concat: {
      dev: {
        files: {
          'build/range.js': sourceJs,
          'build/range.css': sourceCss
        }
      },
      test: {
        files: {
          'build/range.test.js': sourceJs
        }
      }
    },

    jasmine: {
      dev: {
        src: 'build/range.test.js',
        options: {
          specs: [
            'test/spec/range.spec.js'
          ],
          template: require('grunt-template-jasmine-istanbul'),
          outfile: 'test.html',
          keepRunner: true,
          templateOptions: {
            coverage: 'test/report/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: 'test/report/html'
                }
              }
            ]
          }
        }
      },
      prod: {
        src: 'build/range.min.js',
        options: {
          specs: [
            'test/spec/range.spec.js'
          ],
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'test/report/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: 'test/report/html'
                }
              }
            ]
          }
        }
      }
    },

    jshint:{
      all:sourceJs,
      options:{
        "globals": {
          "window": true,
          "document": true
        },
        "boss": true,
        "curly": true,
        "eqeqeq": true,
        "eqnull": true,
        "immed": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "node": true,
        "sub": true,
        "undef": true,
        "white": true
      }
    },
    watch: {
      dev: {
        files: [
          'Gruntfile.js',
          'src/**/*.js',
          'src/*.js',
          'src/range.css'
        ],
        tasks: ['default']
      }
    },

    wrap: {
      dev: {
        src: ['build/range.js'],
        dest: '',
        options: {
          indent: '  ',
          wrapper: [
            ';(function (undefined) {\n  \'use strict\';\n',
            '}());\n'
          ]
        }
      },
      test: {
        src: ['build/range.test.js'],
        dest: '',
        options: {
          indent: '  ',
          wrapper: [
            ';(function (undefined) {\n  \'use strict\';\n',
            '}());\n'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wrap');

  grunt.registerTask('build-dev', [
    'concat:dev',
    'wrap:dev'
  ]);

  grunt.registerTask('build-test', [
    'concat:test'
  ]);

  grunt.registerTask('build-prod', ['build-dev']);

  grunt.registerTask('test-dev', [
    'build-test',
    'jasmine:dev'
  ]);
  grunt.registerTask('test-prod', ['build-prod', 'jasmine:prod']);

  grunt.registerTask('test', ['test-dev']);
  grunt.registerTask('prod', ['build-prod']);
  grunt.registerTask('default', ['build-dev', 'build-test', 'jshint']);
};