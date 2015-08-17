import Ember from 'ember';
import OAuth2 from 'ember-oauth2';

export default Ember.Object.extend({
  init: function() {
    this._super();
    if (this.get('providerId')) {
      this.set('auth', OAuth2.create({providerId: this.get('providerId')}));
    }
  },

  provider: Ember.computed('auth', {
    /*jshint unused: false*/
    get(key) {
      return this.get('auth');
    },
    set(key, value) {
      this.set('providerId', value);
      this.set('auth', OAuth2.create({providerId: value}));
    }
  }),

  isExpired: function() {
    if (this.get('auth')) {
      return this.get('auth').accessTokenIsExpired();
    } else {
      return true;
    }
  },

  isNotExpired: function() {
    if (this.get('auth')) {
      return !this.auth.accessTokenIsExpired();
    } else {
      return false;
    }
  },

  getToken: function() {
    if (this.get('auth')) {
      return this.auth.getToken();
    } else {
      return null;
    }
  },

  getAccessToken: function() {
    if (this.get('auth')) {
      return this.auth.getAccessToken();
    } else {
      return null;
    }
  },

  authorize: function() {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var response = self.auth.authorize();
      var res = response ? resolve(response) : reject(response);
      return res;
    });
  },

  signout: function() {
    if (this.get('auth')) {
      this.auth.removeToken();
      this.set('auth', null);
      this.set('providerId', null);
    } else {
      return null;
    }
  }

});
