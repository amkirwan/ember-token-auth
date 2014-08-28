import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['session'],
  sessionController: Ember.computed.alias('controllers.session'),
  isAuthenticated: Ember.computed.alias('controllers.session.currentUser'),

  actions: {
    authenticate: function(provider) {
      var self = this;
      var session = this.get('session');

      // set the provider
      session.provider(provider);

      session.get('auth').on('success', function() {
        self.get('sessionController').loadUser();
      });
      session.get('auth').on('error', function(error) {
        Ember.Logger.error('Error: ' + error);
      });
      session.authorize().then(function(response) {
        session.get('auth').trigger('redirect', response);
      }, function(error) {
        session.get('auth').trigger('error', error);
      });
    }
  }

});
