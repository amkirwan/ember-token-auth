import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({

  beforeModel: function(/*transition*/) {
    this.get('session').signout();
    var sessionCtrl = this.controllerFor('session');
    sessionCtrl.set('currentUser', null);
  },

});
