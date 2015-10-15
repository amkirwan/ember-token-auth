
export function initialize(app) {
  var session = app.lookup('session:current');

  var config = window.EmberENV['ember-oauth2'];

  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      session.set('provider',  key);
      // sets session providerId and auth to null if expired
      if (session.get('isExpired')) { 
        session.set('provider', null);
      } else {
        break;
      }
    }
  }

  var sessionCtrl = app.lookup('controller:session');

  // try and load the user if the session is still valid
  if (session.get('auth.providerId')) {
    sessionCtrl.loadUser(false);
  }

}

export default {
  name: 'session',
  initialize: initialize
};
