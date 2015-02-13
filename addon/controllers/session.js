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
        var modelKey = null;
        var modelName = window.EmberENV['ember-oauth2']['model'];
        for (var key in json) {
          // key could be returned as plural if using JsonApi format.
          if (modelName === Ember.String.singularize(key)) {
            modelKey = key;
          }
        }

        var user;
        var data;

        // if model name is pluralized it should be in an array, used for JSON API
        if (modelKey === Ember.String.pluralize(modelName)) {
          data = Ember.A(json[modelKey]).get('firstObject');
          user = self.store.push(modelName, self.store.normalize(modelName, data));
        } else {
          data = json[modelKey];
          user = self.store.push(modelName, self.store.normalize(modelName, data));
        }

        if (user) {
          self.set('logginError', false);
          self.set('currentUser', user);
        }

        self.savedTransition(handleTransition);

        resolve(user);
      }, function(err) {
        self.set('logginError', true);
        reject(err);
      });
    });
  }

});
