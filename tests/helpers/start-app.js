/* global require */
import Ember from 'ember';
import Application from 'ember-token-auth/tests/dummy/app/app';
import Router from 'ember-token-auth/tests/dummy/app/router';
import config from 'ember-token-auth/config/environment';

export default function startApp(attrs) {
  var App;

  var attributes = Ember.merge({
    // useful Test defaults
    rootElement: '#ember-testing',
    LOG_ACTIVE_GENERATION:false,
    LOG_VIEW_LOOKUPS: false
  }, attrs); // but you can override;

  Router.reopen({
    location: 'none'
  });

  Ember.run(function(){
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

  return App;
}
