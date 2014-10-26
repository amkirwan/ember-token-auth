import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';
import {auth, session, reopenConfig} from 'dummy/tests/helpers/ember-oauth2';

moduleFor('controller:login', 'LoginController', {
  // Specify the other units that are required for this test.
  needs: ['controller:session'],
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});

test('is authenticated should return the currentUser when authenticated', function() {
  var ctrl = this.subject();
  var sessionCtrl = ctrl.get('controllers.session');
  equal(ctrl.get('isAuthenticated'), null);

  Ember.run(function() {
    var user = Ember.Object.create();
    sessionCtrl.set('currentUser', user);

    equal(ctrl.get('isAuthenticated'), user);
  });
});

