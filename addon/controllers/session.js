import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  loginError: false,
  isAuthenticated: Ember.computed('session', function() {
    return this.get('session').isNotExpired();
  }),

  savedTransition: function(handleTransition) {
    // make handleTransition the default
    if (typeof handleTransition === 'undefined') {
      handleTransition = true;
    }

    if (handleTransition) {
      var previousTransition = this.get('previousTransition');
      if (previousTransition) {
        this.set('previousTransition', null);
        previousTransition.retry();
      } else {
        this.transitionToRoute('index');
      } 
    }
  },

  loadUser: function(handleTransition) {
    var self = this;
    var adapter = this.get('container').lookup('adapter:session');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      adapter.currentUser().then(function(json) {
        var modelName = window.EmberENV['ember-oauth2']['model'];

        var user = null;
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
