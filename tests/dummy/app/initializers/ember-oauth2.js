import { config, hashConfig, savedStateConfig, reopenConfig } from 'dummy/tests/helpers/ember-oauth2';
import OAuth2 from 'ember-oauth2';

export default {
  name: 'ember-oauth2-config',

  initialize: function(/*container, app*/) {
    config();
    hashConfig();
    savedStateConfig();
    var c = reopenConfig();
    OAuth2.reopen(c);
  }
};
