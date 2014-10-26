import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['session'],
  sessionController: Ember.computed.alias('controllers.session'),
  isAuthenticated: Ember.computed.alias('controllers.session.currentUser')
});
