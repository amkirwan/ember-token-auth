import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.controller(),
  sessionController: Ember.computed.alias('session'),
  isAuthenticated: Ember.computed.alias('session.currentUser')
});
