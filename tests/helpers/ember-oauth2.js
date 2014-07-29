import Ember from 'ember';

export var config = function() { 
  Ember.OAuth2.config = {
    testAuth: {
      clientId: '12345',
      authBaseUri: 'http://localhost:4200/oauth/authorize',
      redirectUri: 'http://localhost:4200/oauth/callback',
      currentUser: 'http://localhost:4200/api/current_user',
      currentUserError: 'http://localhost:4200/api/current_user_error', 
      tokeninfo: 'http://localhost:4200/oauth/token/info',
      scope: 'public'
    }
  };
  return Ember.OAuth2.config;
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
export var auth = Ember.OAuth2.create({providerId: 'testAuth'});
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
      session.auth.trigger('redirect', hashConfig()); 
    }
  };
};
