// import { config, hashConfig, savedStateConfig, reopenConfig } from 'dummy/helpers/ember-oauth2';
// import OAuth2 from 'ember-oauth2';

/* jshint unused: false */
export function initialize(app) {
  configEmberOAuth2();
}

function configEmberOAuth2() {
 window.EmberENV['ember-oauth2'] = {
    model: 'users',
    testAuth: {
      clientId: '12345',
      authBaseUri: '/oauth/authorize',
      redirectUri: '/oauth/callback',
      currentUser: '/api/current-user',
      currentUserError: '/api/current-user-error', 
      tokeninfo: '/oauth/token/info',
      scope: 'public'
    }
  };
}

export default {
  name: 'ember-oauth2',
  initialize: initialize
};
