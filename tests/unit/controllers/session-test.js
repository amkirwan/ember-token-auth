import SessionAdapter from 'dummy/adapters/session';
import Session from 'dummy/models/session';
import User from 'dummy/models/user';
import { test, moduleFor } from 'ember-qunit';
import { auth } from 'dummy/tests/helpers/ember-oauth2';
import { setupStore } from '../../helpers/store-helper';

var container;
var store; 
var session;

moduleFor('controller:session', 'SessionController', {
  setup: function() { 
    var env = setupStore();
    var registry = env.registry;
    container = env.container;

    registry.register('adapter:session', SessionAdapter);
    registry.register('model:user', User);

    registry.register('session:current', Session, {singleton: true});
    registry.injection('controller', 'session', 'session:current');
    registry.injection('adapter', 'session', 'session:current');

    session = container.lookup('session:current');
    session.provider('testAuth', auth);

    store = container.lookup('service:store');
    store.set('adapter', '-json-api');
  }
});

test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('loadUser should set the currentUser', function(assert) {
  assert.expect(3); 

  var ctrl = this.subject();
  ctrl.set('container', container);
  ctrl.set('store', store);

  ctrl.transitionToRoute = function() { return true; };

  assert.equal(ctrl.get('currentUser'), null);

  ctrl.loadUser().then(function() {
    assert.equal(ctrl.get('loginError'), false);
    assert.equal(ctrl.get('currentUser').get('lastname'), 'bar');
  });
});

test('should set loginError to true when ajax fails', function(assert) {
  assert.expect(1);
  var oldCurrentUserPath = session.auth.currentUser;
  session.auth.currentUser = session.auth.currentUserError;

  var ctrl = this.subject();
  ctrl.set('session', session);
  ctrl.set('container', container);

  ctrl.loadUser().then(function(data) {
    assert.equal(data, null);
  }, function() {
    assert.equal(ctrl.get('loginError'), true);
  });

  session.auth.currentUser = oldCurrentUserPath;
});
