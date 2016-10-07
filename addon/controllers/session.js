import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  loginError: false,
  isAuthenticated: Ember.computed('sessionCurrent', function() {
    return this.get('sessionCurrent.isNotExpired');
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
        let modelName = window.EmberENV['ember-oauth2']['model'];

        let user = null;
        if (json['data']['type'] === modelName) {
          self.store.pushPayload(json);
          user = self.store.peekRecord('user', json['data']['id']);
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
