module.exports = function(grunt) {
  'use strict';

  var config = require('load-grunt-config')(grunt, {
    pattern: ['grunt-template-*', '!grunt-template-jasmine-requirejs']
  });

  grunt.loadTasks('grunt/tasks');

  config.pkg = grunt.file.readJSON('package.json'); 

  grunt.registerTask('norelease:patch', ['versioner:bumpOnly:default:patch']);

  grunt.registerTask('release:patch', ['versioner:bumpOnly:default:patch', 'versioner:commitOnly:default']);
  grunt.registerTask('release:minor', ['versioner:bumpOnly:default:minor', 'versioner:commitOnly:default']);
  grunt.registerTask('release:major', ['versioner:bumpOnly:default:major', 'versioner:commitOnly:default']);
  grunt.registerTask('latest-build:git', ['versioner:bumpOnly:git']);

  grunt.registerTask('release:npm', ['versioner:npmOnly:default']);

  grunt.initConfig(config);
};
