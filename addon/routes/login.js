import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    if (this.get('provider')) {
      var session = this.get('session');
      return session.authorize().then(function(response) {
        session.get('auth').trigger('redirect', response);
      }, function(error) {
        session.get('auth').trigger('error', error);
      });
    }
  },

  setupController: function(controller/*, model*/) {
    if (this.get('session').isExpired()) {
      controller.set('currentUser', null);
    }
  },

  actions: {
    authenticate: function(provider) {
      var router = this;
      var session = this.get('session');

      // set the provider
      router.set('provider', provider);
      session.provider(provider);

      session.get('auth').on('success', function() {
        router.controllerFor('session').loadUser().then(function(value) {
        }, function(err) {
          Ember.Logger.error("Error: Cannot retrieve the current user.");
          Ember.Logger.error(err);
        });
      });

      session.get('auth').on('error', function(error) {
        router.controllerFor('session').set('logginError', true);
        Ember.Logger.error("Error: Login rejected:");
        Ember.Logger.error(error);
      });

      // refresh the route model
      router.refresh();
    }
  }
});
