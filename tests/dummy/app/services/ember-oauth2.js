import Ember from 'ember';
import EmberOAuth2 from 'ember-oauth2/services/ember-oauth2';

export default EmberOAuth2.extend({

  init() {
    this.set('statePrefix', 'state');
    this.set('tokenPrefix', 'token');
    this.set('responseType', 'token');
    this.setConfig();
  },

  setConfig() {
    this.set('config', window.EmberENV['ember-oauth2']);
  },

  setProvider(providerId) {
    this.set('providerId', providerId);
    this.set('providerConfig', this.get('config')[this.get('providerId')]);
    this.setProperties(this.providerConfig);
    return this;
  },

  checkState() {
    return true;
  },

  openWindow() {
    return new Ember.RSVP.Promise(function(resolve) {
      resolve({ location: { hash: '#access_token=12345&token_type=Bearer&expires_in=3600&state=abcd' } });
    });
  }
});
