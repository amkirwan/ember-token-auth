import Ember from 'ember';

export default Ember.Route.extend({
  model: function(transition) {
    var self = this;
    var adapter = this.get('container').lookup('adapter:session');
    return adapter.currentUser().then(function(json) {
      self.store.pushPayload('user', json);
      self.store.findById('user', json.user.id);
    });
  },

  setupController: function(controller, model) {
    controller.set('logginError', false);
    controller.set('currentUser', model);
  },

  actions: {
    error: function(reason) {
      this.get('controller').set('logginError', true);
      Ember.Logger.error('Error: ' + reason);
    }
  }
});
    // var self = this;
    // var adapter = this.get('container').lookup('adapter:session');
    // return adapter.currentUser().then(function(json) {
    //   self.store.pushPayload('user', json);
    //   var user = self.store.findById('user', json.user.id);
    //   self.set('logginError', false);
    //   self.set('currentUser', user);

    //   handleTransition = typeof handleTransition !== 'undefined' ? false : true;

    //   if (handleTransition) {
    //     var previousTransition = self.get('previousTransition');
    //     if (previousTransition) {
    //       self.set('previousTransition', null);
    //       previousTransition.retry();
    //     } else {
    //       self.transitionToRoute('index');
    //     }
    //   }
    // }, function(err) {
    //   self.set('logginError', true);
    //   Ember.Logger.error('Error: ' + err.errorThrown);
    // });
