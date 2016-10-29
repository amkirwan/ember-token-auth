import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  loginError: false,
  isAuthenticated: Ember.computed('sessionCurrent', function() {
    return this.get('sessionCurrent.isNotExpired');
  }),

  modelName: window.EmberENV['ember-oauth2']['model'],

	_jsonModelName: null,
  jsonModelName: Ember.computed('_jsonModelName', 'modelName', {
    /* jshint unused: false */
		get(key) {
			if (this.get('_jsonModelName')) {
				return this.get('_jsonModelName');
			} else {
				return Ember.String.pluralize(this.get('modelName'));
			}
    },
    set(key, value) {
      this.set('_jsonModelName', value);
      return value;
    }
  }),

	_storeModelName: null,
  storeModelName: Ember.computed('_storeModelName', 'modelName', {
    /* jshint unused: false */
		get(key) {
			if (this.get('_storeModelName')) {
				return this.get('_storeModelName');
			} else {
				return this.get('modelName');
			}
    },
    set(key, value) {
      this.set('_storeModelName', value);
      return value;
    }
  }),

  savedTransition: function(handleTransition) {
    // make handleTransition the default
    if (typeof handleTransition === 'undefined') {
      handleTransition = true;
    }

    if (handleTransition) {
      let previousTransition = this.get('previousTransition');
      if (previousTransition) {
        this.set('previousTransition', null);
        previousTransition.retry();
      } else {
        this.transitionToRoute('index');
      } 
    }
  },

  loadUser: function(handleTransition) {
    let self = this;
    let adapter = Ember.getOwner(self).lookup('adapter:session');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      adapter.currentUser().then(function(json) {
        let user = null;
        if (json['data']['type'] === self.get('jsonModelName')) {
          self.store.pushPayload(self.get('storeModelName'), json);
          user = self.store.peekRecord(self.get('storeModelName'), json['data']['id']);
        }

        if (user) {
          self.set('loginError', false);
          self.set('currentUser', user);
        }

        self.savedTransition(handleTransition);

        resolve(user);
      }, function(err) {
        self.set('loginError', true);
        reject(err);
      });
    });
  }

});
