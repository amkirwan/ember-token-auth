import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(/*transition*/) {
    this.get('sessionCurrent').signout();
    var sessionCtrl = this.controllerFor('session');
    sessionCtrl.set('currentUser', null);
  },

});
