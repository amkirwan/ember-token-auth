'use strict';

var path = require('path');
var fs   = require('fs');

function EmberTokenAuth(project) {
  this.project = project;
  this.name    = "ember-token-auth";
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberTokenAuth.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', "ember-token-auth", name);

  if (name === 'templates' || name === 'styles') {
    var treePath =  path.join('node_modules', "ember-token-auth", 'app', name);
  } else if (name === 'app') {
    var treePath =  path.join('node_modules', "ember-token-auth", name);
  } else {
    var treePath =  path.join('node_modules', "ember-token-auth", name + '-addon');
  }

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

module.exports = EmberTokenAuth;
