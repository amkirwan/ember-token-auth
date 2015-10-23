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
      // check if the value is falsey ie: most likely set to null
      if (value) {
        this.set('auth', OAuth2.create({providerId: value}));
      } else {
        this.set('auth', value);
      }
    }
  }),

  isExpired: Ember.computed('auth', {
    /*jshint unused: false*/
    get(key) {
      if (this.get('auth')) {
        return this.get('auth').accessTokenIsExpired();
      } else {
        return true;
      }
    }
  }),

  isNotExpired: Ember.computed('isExpired', {
    /*jshint unused: false*/
    get(key) {
      return !this.get('isExpired');
    }
  }),

  token: Ember.computed('auth', {
    /*jshint unused: false*/
    get(key) {
      return this.get('auth') ? this.get('auth').getToken() : null;
    }
  }),

  accessToken: Ember.computed('auth', {
    /*jshint unused: false*/
    get(key) {
      return this.get('auth') ? this.get('auth').getAccessToken() : false;
    }
  }),

  authorize: function() {
    return this.auth.authorize();
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
