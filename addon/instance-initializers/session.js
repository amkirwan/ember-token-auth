import OAuth2 from 'ember-oauth2';

export function initialize(app) {
  var session = app.container.lookup('session:current');

  // app.inject('controller', 'session', session);
  // app.inject('route', 'session', session);
  // app.inject('adapter', 'session', session);

  var config = window.EmberENV['ember-oauth2'];

  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      var auth = OAuth2.create({providerId: key});
      // load valid token if it exists and is not expired
      if (auth.getAccessToken() && !auth.accessTokenIsExpired()) {
        session.provider(key, auth);
        break;
      }
    }
  }

  var sessionCtrl = app.container.lookup('controller:session');

  // try and load the user if the session is still valid
  if (session.get('auth.providerId')) {
    sessionCtrl.loadUser(false);
  }

}

export default {
  name: 'session',
  initialize: initialize
};
