import Session from 'dummy/models/session';
import { test, moduleFor } from 'ember-qunit';
import Pretender from 'pretender';

let sessionCurrent;
let server;

moduleFor('controller:session', 'Unit | SessionController | session', {
  unit: true,
  needs: ['model:session', 'model:user', 'adapter:session', 'service:ember-oauth2' ],
  beforeEach: function() { 
    window.EmberENV['ember-oauth2'] =
    {
      model: 'user',
      testAuth: {
        clientId: '12345',
        authBaseUri: '/oauth/authorize',
        redirectUri: '/oauth/callback',
        currentUser: '/api/current-user',
        currentUserError: '/api/current-user-error', 
        tokeninfo: '/oauth/token/info',
        scope: 'public'
      }
    };
    // inject and configure the session
    this.register('session:current', Session, {singleton: true});
    this.registry.injection('adapter', 'sessionCurrent', 'session:current');
    sessionCurrent = this.container.lookup('session:current');
    sessionCurrent.set('provider', 'testAuth');

    server = new Pretender(function() {
      this.get('/api/current-user', function() {
        return [200, {"Content-Type": "application/vnd.api+json"}, JSON.stringify({"data":{"type":"users","id":"1","attributes":{"firstname":"foo","lastname":"bar"}}})];
      });
      this.get('/api/current-user-error', function() {
        return [500, {"Content-Type": "application/vnd.api+json"}, JSON.stringify({"errors":[{"id":"1","status":"500","title":"internal_service_error","detail":"internal_service_error_detail"}]})];
      });
    });
  },
  afterEach: function() {
    server.shutdown();
  }
});

test('it exists', function(assert) {
  const ctrl = this.subject();
  assert.ok(ctrl);
});

test('loadUser should set the currentUser', function(assert) {
  assert.expect(2); 
  const ctrl = this.subject();

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

  ctrl.loadUser().then(function(data) {
    assert.equal(data, null);
  }, function() {
    assert.equal(ctrl.get('loginError'), true);
  });

  sessionCurrent.auth.currentUser = oldCurrentUserPath;
});
