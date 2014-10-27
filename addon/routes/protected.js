import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    if (this.session.isExpired() && location.pathname !== '/login') {

      var sessionController = this.controllerFor('session');
      if (sessionController.get('previousTransition') !== null) {
        sessionController.set('previousTransition', transition); 
      }
      this.transitionTo('login');
    }
  }
});
