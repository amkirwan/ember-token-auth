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

  getToken: function() {
    Ember.deprecate('Use the Session property token instead of getToken() method. Will be removed in version 2.0', false, {
      id: 'model.session.getToken()',
      until: '2.0.0'
    });
    if (this.get('auth')) {
      return this.get('auth').getToken();
    } else {
      return null;
    }
  },

  accessToken: Ember.computed('auth', {
    /*jshint unused: false*/
    get(key) {
      return this.get('auth') ? this.get('auth').getAccessToken() : false;
    }
  }),

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
