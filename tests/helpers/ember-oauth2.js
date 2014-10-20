import Ember from 'ember';
import OAuth2 from 'ember-oauth2';

export var config = function() { 
  window.ENV = window.ENV || {};
  window.ENV['ember-oauth2'] = {
    testAuth: {
      clientId: '12345',
      authBaseUri: '/oauth/authorize',
      redirectUri: '/oauth/callback',
      currentUser: '/api/current_user',
      currentUserError: '/api/current_user_error', 
      tokeninfo: '/oauth/token/info',
      scope: 'public'
    }
  };
  return window.ENV['ember-oauth2'];
};

export var hashConfig = function() { 
  return '#access_token=' + '12345' + '&token_type=' + 'Bearer' + '&expires_in=' + '3600' + '&state=' + 'abcd';
};

export var savedStateConfig = function () {
  return { 'provider_id': 'testAuth',
    'response_type': 'token',
    'state': 'abcd',
    'client_id': '12345',
    'scope': 'public'
  };
};

var c = config();
export var auth = OAuth2.create({providerId: 'testAuth'});
export var session = Ember.Object.create({provider: function() {return true;}, auth: auth});

export var reopenConfig = function() {
  return {
    getState: function() {
      return savedStateConfig();
    },
    checkState: function() {
      return true;
    },
    authorize: function() {
      return this.openWindow();
    },
    openWindow: function() {
      return new Ember.RSVP.Promise(function(resolve) {
        resolve(hashConfig());
      });
    }
  };
};
