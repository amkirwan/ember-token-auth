import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Protected', {
  setup: function() {
    if (window.localStorage.getItem('token-testAuth')) {
      window.localStorage.removeItem('token-testAuth');
    }
    App = startApp();
  },

  teardown: function() {
    window.history.pushState('','','/tests');
    Ember.run(App, 'destroy');
  }
});

test('visiting /foobar', function() {
  visit('/foobar');

  andThen(function() {
    equal(currentPath(), 'login');
  });
});

test('visiting /foobar then logging should redirect back to /foobar', function() {
  visit('/foobar');
  click('button#login');


  andThen(function() {
    equal(currentPath(), 'foobar');
  });
});
