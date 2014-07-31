import Ember from 'ember';
import DS from 'ember-data';
import User from 'ember-token-auth/models/user';
import { test, moduleFor } from 'ember-qunit';
import {auth, session, reopenConfig} from 'ember-token-auth/tests/helpers/ember-oauth2';

var container;
var store;

moduleFor('controller:session', 'SessionController', {
  needs: ['controller:session'],
  setup: function() { 
    container = new Ember.Container(); 
    container.register('store:main', DS.Store.extend());
    container.register('serializer:-default', DS.JSONSerializer);
    container.register('serializer:-rest', DS.RESTSerializer);
    container.register('adapter:-rest', DS.RESTAdapter);
    container.injection('serializer', 'store', 'store:main');

    container.register('model:user', User);
    store = container.lookup('store:main');
  }
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});

test('loadUser should set the currentUser', function() {
  expect(3); 

  var ctrl = this.subject();
  ctrl.set('session', session);
  ctrl.set('store', store);
  ctrl.transitionToRoute = function() { return true; };

  equal(ctrl.get('currentUser'), null);

  stop();
  ctrl.loadUser().then(function() {
    start();
    equal(ctrl.get('logginError'), false);
    equal(ctrl.get('currentUser').get('lastname'), 'bar');
  });
});


test('should set lgginError to true when ajax fails', function() {
  session.auth.currentUser = session.auth.currentUserError;

  var ctrl = this.subject();
  ctrl.set('session', session);

  stop();
  ctrl.loadUser().then(function() {
    start();
    equal(ctrl.get('logginError'), true);
  });
});
