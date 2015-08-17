import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(/*transition*/) {
    if (this.get('sessionCurrent').isExpired()) {
      this.set('provider', null);
    }
  },

  model: function(/*params, transition*/) {
    return this.get('sessionCurrent');
  },

  setupController: function(controller/*, model*/) {
    if (this.get('sessionCurrent').isExpired()) {
      controller.set('currentUser', null);
    }
  },

  authorize: function() {
    if (this.get('provider')) {
      var sessionCurrent = this.get('sessionCurrent');
      return sessionCurrent.authorize().then(function(response) {
        sessionCurrent.get('auth').trigger('redirect', response);
      }, function(error) {
        sessionCurrent.get('auth').trigger('error', error);
      });
    }
  },

  actions: {

    authenticate: function(provider) {
      var router = this;
      var sessionCurrent = this.get('sessionCurrent');

      // set the provider
      router.set('provider', provider);
      sessionCurrent.set('provider', provider);

      sessionCurrent.get('auth').on('success', function() {
        router.controllerFor('session').loadUser().then(function(/*value*/) {
        }, function(err) {
          Ember.Logger.error("Error: Cannot retrieve the current user.");
          Ember.Logger.error(err);
        });
      });

      sessionCurrent.get('auth').on('error', function(error) {
        router.controllerFor('session').set('loginError', true);
        Ember.Logger.error("Error: Login rejected:");
        Ember.Logger.error(error);
      });

      this.authorize();
    }
  }
});
