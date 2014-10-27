'use strict';

module.exports = {
  name: 'ember-token-auth',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/ember-oauth2/dist/ember-oauth2.amd.js', {
      exports: {
        'ember-oauth2': ['default']
      }
    });
  }
};
