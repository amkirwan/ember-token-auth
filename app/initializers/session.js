import Session from '../models/session';
import OAuth2 from 'ember-oauth2';

export default {
  name: 'session',
  initialize: initialize,
  after: 'store'
};

export function initialize(container, app) {

  app.deferReadiness(); 

  var session = 'session:current';
  container.register(session, Session, {singleton: true});
  container.typeInjection('controller', 'session', session);
  container.typeInjection('route', 'session', session);
  container.typeInjection('adapter', 'session', session);

  var config = window.ENV['ember-oauth2'];
  session = container.lookup(session);
  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      var provider = OAuth2.create({providerId: key});
      // load valid token if it exists and is not expired
      if (provider.getAccessToken() && !provider.accessTokenIsExpired()) {
        session.set('auth', provider);
        break;
      }
    }
  }

  var sessionCtrl = container.lookup('controller:session');

  // try and load the user if the session is still valid
  if (session.get('auth.providerId')) {
    sessionCtrl.loadUser(false).then(function() {
      return app.advanceReadiness();
    }, function() {
      return app.advanceReadiness();
    });
  } else {
    app.advanceReadiness();
  }
};
