import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:login', 'Unit | LoginController | login', {
  unit: true,
  needs: ['controller:session']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('authenticated should return the currentUser when authenticated', function(assert) {
  var ctrl = this.subject();

  var sessionCtrl = ctrl.get('session');
  assert.equal(ctrl.get('isAuthenticated'), null);

  Ember.run(function() {
    var user = Ember.Object.create();
    sessionCtrl.set('currentUser', user);

    assert.equal(ctrl.get('isAuthenticated'), user);
  });
});
