import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App;
var server;

module('Acceptance: Login', {
  setup: function() {
    if (window.localStorage.getItem('token-testAuth')) {
      window.localStorage.removeItem('token-testAuth');
    }
    App = startApp();

    server = new Pretender(function() {
      this.get('/api/current-user', function() {
        return [200, {"Content-Type": "application/vnd.api+json"}, JSON.stringify({"data":{"type":"users","id":"1","attributes":{"firstname":"foo","lastname":"bar"}}})];
      });
      this.get('/api/current-user-error', function() {
        return [500, {"Content-Type": "application/vnd.api+json"}, JSON.stringify({"errors":[{"id":"1","status":"500","title":"internal_service_error","detail":"internal_service_error_detail"}]})];
      });
    });
  },

  teardown: function() {
    window.history.pushState('','','/tests');
    Ember.run(App, 'destroy');
    server.shutdown();
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
