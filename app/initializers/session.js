// import Ember from 'ember';
import Session from '../models/session';
import OAuth2 from 'vendor/ember-oauth2/lib/ember-oauth2';

export default {
  name: 'session',
  after: 'store',

  initialize: function(container, app) {

    app.deferReadiness(); 

    var session = 'session:current';
    container.register(session, Session, {singleton: true});
    container.typeInjection('controller', 'session', session);
    container.typeInjection('route', 'session', session);
    container.typeInjection('adapter', 'session', session);

    var config = window.ENV['ember-oauth2'];
    for (var key in config) {
      if (config.hasOwnProperty(key)) {
        var provider = OAuth2.create({providerId: key});
        // load valid token if it exists and is not expired
        if (provider.getAccessToken() && !provider.accessTokenIsExpired()) {
          container.lookup(session).set('auth', provider);
          break;
        }
      }
    }

    session = container.lookup('session:current');
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
  }
};
