export default Ember.Route.extend({
  beforeModel: function(/*transition*/) {
    if (this.session.isNotExpired()) {
      this.transitionTo('index');
    } 
  },

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
    if (this.session.isExpired()) {
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
        router.controllerFor('session').loadUser();
      });
      session.get('auth').on('error', function(error) {
        Ember.Logger.error('Error: ' + error);
      });
      // refresh route
      router.refresh();
    },

    loading: function(transition, originRoute) {
      alert('loading');
    }
  }
});
