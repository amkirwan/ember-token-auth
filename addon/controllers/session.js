import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  logginError: false,
  isAuthenticated: function() {
    this.get('session').isNotExpired();
  }.property('session'),

  loadUser: function(handleTransition) {
    var self = this;
    var adapter = this.get('container').lookup('adapter:session');
    return new Ember.RSVP.Promise(function(resolve, reject) { 
      adapter.currentUser().then(function(json) {
        self.store.pushPayload(window.EmberENV['ember-oauth2']['model'], json);
        var user = self.store.findById(window.EmberENV['ember-oauth2']['model'], json.user.id);
        self.set('logginError', false);
        self.set('currentUser', user);

        handleTransition = typeof handleTransition !== 'undefined' ? false : true;

        if (handleTransition) {
          var previousTransition = self.get('previousTransition');
          if (previousTransition) {
            self.set('previousTransition', null);
            previousTransition.retry();
          } else {
            self.transitionToRoute('index');
          }
        }
        resolve(user);
      }, function(err) {
        self.set('logginError', true);
        Ember.Logger.error('Error: ' + err.errorThrown);
        reject(err);
      });
    });
  }

});
