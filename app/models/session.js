import Ember from 'ember';

export default Ember.Object.extend({
  init: function() {
    this._super();
    this.set('auth', Ember.OAuth2.create({providerId: this.providerId}));
  },
  
  provider: function(providerId) {
    if (arguments.length === 1) {
      this.set('providerId', providerId);
      this.set('auth', Ember.OAuth2.create({providerId: providerId}));
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

  authorize: function() {
    return this.auth.authorize();
  },

  currentUser: function() {
    return this.auth.currentUser;
  }

});
