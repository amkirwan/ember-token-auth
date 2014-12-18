import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  logginError: false,
  isAuthenticated: function() {
    this.get('session').isNotExpired();
  }.property('session'),

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
        self.store.pushPayload(window.EmberENV['ember-oauth2']['model'], json);

        var modelKey = null;
        for (var key in json) {
          // key could be returned as plural if using JsonApi format.
          if (window.EmberENV['ember-oauth2']['model'] === Ember.String.singularize(key)) {
            modelKey = key;
          }
        }

        var user = self.store.findById(window.EmberENV['ember-oauth2']['model'], json[modelKey]['id']).then(function(user) {
          self.set('logginError', false);
          self.set('currentUser', user);
        });

        self.savedTransition(handleTransition);

        resolve(user);
      }, function(err) {
        self.set('logginError', true);
        reject(err);
      });
    });
  }

});
