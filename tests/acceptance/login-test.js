import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Login', {
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

test('visiting /login when there is not valid login should not redirect', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /login should redirect to index when there is a valid login', function(assert) {
  visit('/login');
  click('button#login');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('logging in is successful but current_user returns error', function(assert) {

  window.EmberENV['ember-oauth2'].testAuth.currentUser = window.EmberENV['ember-oauth2'].testAuth.currentUserError;

  visit('/login');
  click('button#login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
    assert.equal(find('p.error').text(), 'There was an error logging in. Please try again.');
  });
});
