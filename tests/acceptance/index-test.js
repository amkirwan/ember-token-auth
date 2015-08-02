import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Index', {
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

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
  });
});
