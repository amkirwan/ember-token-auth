import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(/*transition*/) {
    if (this.session.isNotExpired() && location.pathname === '/login') {
      this.transitionTo('index');
    } 
  },
  setupController: function(controller/*, model*/) {
    if (this.session.isExpired()) {
      controller.set('currentUser', null);
    }
  }
});
