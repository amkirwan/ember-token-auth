import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';
import {auth, session, reopenConfig} from 'ember-token-auth/tests/helpers/ember-oauth2';

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

test('authenticated action on success loadUser should be called', function() {
  var ctrl = this.subject();
  var sessionCtrl = ctrl.get('controllers.session');
  ctrl.set('session', session);

  var user = Ember.Object.create();

  // stub authorize method to only trigger success
  var authStub = sinon.stub(auth, 'authorize', function() {
    return new Promise(function(resolve) {
      session.auth.trigger('success');
    });
  });

  var loadUserStub = sinon.stub(sessionCtrl, 'loadUser', function() { 
    return sessionCtrl.set('currentUser', user);
  });

  ctrl.send('authenticate', 'testAuth');

  // if success called then isAuthenticated should return the user
  equal(ctrl.get('isAuthenticated'), user);
  authStub.restore();
  loadUserStub.restore();
});

test('authenticated action on error loadUser should be called', function() {
  var ctrl = this.subject();
  var sessionCtrl = ctrl.get('controllers.session');
  ctrl.set('session', session);

  // stub authorize method to only trigger success
  var authStub = sinon.stub(auth, 'authorize', function() {
    return new Promise(function(resolve) {
      session.auth.trigger('error');
    });
  });

  ctrl.send('authenticate', 'testAuth');

  // if success called then isAuthenticated should return the user
  equal(ctrl.get('isAuthenticated'), null);
  authStub.restore();
});
