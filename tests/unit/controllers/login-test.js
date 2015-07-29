import Ember from 'ember';
import SessionController from 'dummy/controllers/session';
import { test, moduleFor } from 'ember-qunit';
import { setupStore, createStore } from '../../helpers/store-helper';

var container;
var registry;

moduleFor('controller:login', 'LoginController', {
  // Specify the other units that are required for this test.
  setup: function() {
    var env = setupStore();
    registry = env.registry;
    container = env.container;

    registry.register('controller:session', SessionController);
    var sessionCtrl = container.lookup('controller:session');
    this.subject().set('session', sessionCtrl);
  }
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});

test('authenticated should return the currentUser when authenticated', function() {
  var ctrl = this.subject();

  var sessionCtrl = ctrl.get('session');
  equal(ctrl.get('isAuthenticated'), null);

  Ember.run(function() {
    var user = Ember.Object.create();
    sessionCtrl.set('currentUser', user);

    equal(ctrl.get('isAuthenticated'), user);
  });
});
