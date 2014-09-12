import Ember from 'ember';
import OAuth2 from 'vendor/ember-oauth2/lib/ember-oauth2';

export default Ember.Object.extend({
  init: function() {
    this._super();
    this.set('auth', OAuth2.create({providerId: this.providerId}));
  },
  
  provider: function(providerId) {
    if (arguments.length === 1) {
      this.set('providerId', providerId);
      this.set('auth', OAuth2.create({providerId: providerId}));
    }
    return this.get('auth');
  },

  isExpired: function() {
    return this.auth.accessTokenIsExpired();
  },

  isNotExpired: function() {
    return !this.auth.accessTokenIsExpired();
  },

  getToken: function() {
    return this.auth.getToken();
  },

  getAccessToken: function() {
    return this.auth.getAccessToken();
  },

  authorize: function() {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve) {
      resolve(self.auth.authorize());
    });
  }

});
