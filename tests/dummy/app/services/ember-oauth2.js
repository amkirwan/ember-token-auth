import Ember from 'ember';
import EmberOAuth2 from 'ember-oauth2/services/ember-oauth2';

export default EmberOAuth2.extend({

  checkState() {
    return true;
  },

  openWindow() {
    return new Ember.RSVP.Promise(function(resolve) {
      resolve({ location: { hash: '#access_token=12345&token_type=Bearer&expires_in=3600&state=abcd' } });
    });
  }
});
