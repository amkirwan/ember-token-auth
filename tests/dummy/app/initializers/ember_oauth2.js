import Ember from 'ember';
import {config, hashConfig, savedStateConfig, reopenConfig} from 'ember-token-auth/tests/helpers/ember-oauth2';

export default {
  name: 'ember-oauth2-config',

  initialize: function(container/*, app*/) {
    config();
    var hash = hashConfig();
    savedStateConfig();
    var c = reopenConfig();
    Ember.OAuth2.reopen(c);

    Ember.OAuth2.reopen({
      // need to set session for acceptance tests
      openWindow: function() {
        var session = container.lookup('session:current');
        session.auth.trigger('redirect', hash); 
      }
    });
  }
};
