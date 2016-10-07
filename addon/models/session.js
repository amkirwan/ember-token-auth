import Ember from 'ember';

export default Ember.Object.extend({
  emberOauth2: Ember.inject.service(),
  auth: null,

  provider: Ember.computed('auth', {
    /*jshint unused: false*/
    get(key) {
      return this.get('auth');
    },
    set(key, value) {
      this.set('providerId', value);
      // check if the value is falsey ie: most likely set to null
      if (value) {
        this.set('auth', this.get('emberOauth2').setProvider(value));
      } else {
        this.set('auth', value);
      }
      return value;
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
