import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['session'],
  sessionController: Ember.computed.alias('controllers.session'),
  isAuthenticated: Ember.computed.alias('controllers.session.currentUser'),

  actions: {
    authenticate: function(provider) {
      this.get('session').provider(provider);
      var self = this;
      this.get('session.auth').on('success', function() {
        self.get('sessionController').loadUser();
      });
      this.get('session.auth').on('error', function(error) {
        Ember.Logger.error('Error: ' + error);
      });
      this.get('session.auth').authorize().then(function(redirectUrl) {
        self.get('session.auth').trigger('redirect', redirectUrl);
      });
    }
  }

});
