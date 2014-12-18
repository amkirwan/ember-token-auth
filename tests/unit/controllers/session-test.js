import Ember from 'ember';
import DS from 'ember-data';
import SessionAdapter from 'dummy/adapters/session';
import User from 'dummy/models/user';
import { test, moduleFor } from 'ember-qunit';
import {auth, session, reopenConfig} from 'dummy/tests/helpers/ember-oauth2';

var container;
var store;
var sessionAdapter;

moduleFor('controller:session', 'SessionController', {
  needs: ['controller:session'],
  setup: function() { 
    container = new Ember.Container(); 
    container.register('store:main', DS.Store.extend());
    container.register('serializer:-default', DS.JSONSerializer);
    container.register('serializer:-rest', DS.RESTSerializer);
    container.register('adapter:-rest', DS.RESTAdapter);
    container.register('adapter:session', SessionAdapter);
    container.injection('serializer', 'store', 'store:main');

    container.register('model:user', User);
    store = container.lookup('store:main');
    sessionAdapter = container.lookup('adapter:session');
    sessionAdapter.set('session', session);
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
  ctrl.set('container', container);

  ctrl.transitionToRoute = function() { return true; };

  equal(ctrl.get('currentUser'), null);

  stop();
  ctrl.loadUser().then(function() {
    start();
    equal(ctrl.get('logginError'), false);
    equal(ctrl.get('currentUser').get('lastname'), 'bar');
  });
});

test('should set logginError to true when ajax fails', function() {
  expect(1);
  var oldCurrentUserPath = session.auth.currentUser;
  session.auth.currentUser = session.auth.currentUserError;

  var ctrl = this.subject();
  ctrl.set('session', session);
  ctrl.set('container', container);

  stop();
  ctrl.loadUser().then(function(data) {
    equal(data, null);
  }, function(error) {
    start();
    equal(ctrl.get('logginError'), true);
  });

  session.auth.currentUser = oldCurrentUserPath;
});
