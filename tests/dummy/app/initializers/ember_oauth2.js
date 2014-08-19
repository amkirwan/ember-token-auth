import Ember from 'ember';
import {config, hashConfig, savedStateConfig, reopenConfig} from 'ember-token-auth/tests/helpers/ember-oauth2';

export default {
  name: 'ember-oauth2-config',

  initialize: function(/*container, app*/) {
    config();
    hashConfig();
    savedStateConfig();
    var c = reopenConfig();
    Ember.OAuth2.reopen(c);
  }
};
