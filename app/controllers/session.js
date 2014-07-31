import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  currentUser: null,
  logginError: false,
  isAuthenticated: function() {
    this.get('session').isNotExpired();
  }.property('session'),


  loadUser: function(handleTrans) {
    var self = this;
    return ajax(self.get('session.auth.currentUser')).then(function(json) {
      self.store.pushPayload('user', json);
      var user = self.store.findById('user', json.user.id);
      self.set('logginError', false);
      self.set('currentUser', user);

      handleTrans = typeof handleTrans !== 'undefined' ? false : true;

      if (handleTrans) {
        var previousTransition = self.get('previousTransition');
        if (previousTransition) {
          self.set('previousTransition', null);
          previousTransition.retry();
        } else {
          self.transitionToRoute('index');
        }
      }
    }, function(err) {
      self.set('logginError', true);
      Ember.Logger.error('Error: ' + err.errorThrown);
    });
  }
});
