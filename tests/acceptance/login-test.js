import Ember from 'ember';
import OAuth2 from 'ember-oauth2';
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

test('visiting /login when there is not valid login should not redirect', function() {
  visit('/login');

  andThen(function() {
    equal(currentURL(), '/login');
  });
});

test('visiting /login should redirect to index when there is a valid login', function() {
  visit('/login');
  click('button#login');

  andThen(function() {
    equal(currentURL(), '/');
  });
});

test('login fails', function() {
  OAuth2.reopen({
    openWindow: function() {
      return new Ember.RSVP.Promise(function(resolve,reject) {
        reject(new Error('Opening dialog login window failed.'));
      });
    }
  });

  visit('/login');
  click('button#login');

  andThen(function() {
    equal(currentURL(), '/login');
    equal(find('p.error').text(), 'There was an error logging in. Please try again.');
  });
});

test('logging in is successful but current_user returns error', function() {

  window.EmberENV['ember-oauth2'].testAuth.currentUser = window.EmberENV['ember-oauth2'].testAuth.currentUserError;

  visit('/login');
  click('button#login');

  andThen(function() {
    equal(currentURL(), '/login');
    equal(find('p.error').text(), 'There was an error logging in. Please try again.');
  });
});
