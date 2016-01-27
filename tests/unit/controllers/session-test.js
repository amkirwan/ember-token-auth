import SessionAdapter from 'dummy/adapters/session';
import Session from 'dummy/models/session';
import User from 'dummy/models/user';
import { test, moduleFor } from 'ember-qunit';
import { setupStore } from '../../helpers/store-helper';
import Pretender from 'pretender';

var container;
var store; 
var sessionCurrent;
var server;

moduleFor('controller:session', 'SessionController', {
  setup: function() { 
    var env = setupStore();
    var registry = env.registry;
    container = env.container;

    registry.register('adapter:session', SessionAdapter);
    registry.register('model:user', User);

    registry.register('session:current', Session, {singleton: true});
    registry.injection('controller', 'sessionCurrent', 'session:current');
    registry.injection('adapter', 'sessionCurrent', 'session:current');

    sessionCurrent = container.lookup('session:current');
    sessionCurrent.set('provider', 'testAuth');

    store = container.lookup('service:store');
    store.set('adapter', '-json-api');

    server = new Pretender(function() {
      this.get('/api/current-user', function() {
        return [200, {"Content-Type": "application/vnd.api+json"}, JSON.stringify({"data":{"type":"users","id":"1","attributes":{"firstname":"foo","lastname":"bar"}}})];
      });
      this.get('/api/current-user-error', function() {
        return [500, {"Content-Type": "application/vnd.api+json"}, JSON.stringify({"errors":[{"id":"1","status":"500","title":"internal_service_error","detail":"internal_service_error_detail"}]})];
      });
    });
  }
});

test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
  server.shutdown();
});

test('loadUser should set the currentUser', function(assert) {
  assert.expect(2); 

  var ctrl = this.subject();
  ctrl.set('container', container);
  ctrl.set('store', store);

  ctrl.transitionToRoute = function() { return true; };

  assert.equal(ctrl.get('currentUser'), null);

  ctrl.loadUser().then(function() {
    assert.equal(ctrl.get('loginError'), false);
  });
});

test('should set loginError to true when ajax fails', function(assert) {
  assert.expect(1);
  var oldCurrentUserPath = sessionCurrent.auth.currentUser;
  sessionCurrent.auth.currentUser = sessionCurrent.auth.currentUserError;

  var ctrl = this.subject();
  ctrl.set('sessionCurrent', sessionCurrent);
  ctrl.set('container', container);

  ctrl.loadUser().then(function(data) {
    assert.equal(data, null);
  }, function() {
    assert.equal(ctrl.get('loginError'), true);
  });

  sessionCurrent.auth.currentUser = oldCurrentUserPath;
});
