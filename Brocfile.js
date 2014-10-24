/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var mergeTrees = require('broccoli-merge-trees');

var appTree = mergeTrees(['app', 'tests/dummy/app'], { overwrite: true });
var templatesTree = mergeTrees(['app/templates', 'tests/dummy/app/templates'], { overwrite: true });

var app = new EmberApp({
  trees: {
    app: appTree,
    templates: templatesTree
  }  
});

if (app.env === 'development') {
  app.import('bower_components/sinon/index.js');
}

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
