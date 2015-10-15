import { test, moduleForModel } from 'ember-qunit';
import Session from 'dummy/models/session';
import { auth } from 'dummy/tests/helpers/ember-oauth2';

var model;

moduleForModel('session:current', 'Session Model', {
  setup: function() {
    model = Session.create();
    model.set('auth', auth); /* set the auth object because generating it in Session.create() will cause tests to fail that compaire auth */
  }
});

test('it exists', function(assert) {
  assert.ok(model);
});

test('create the session and set the auth object', function(assert) {
  var m = Session.create({providerId: 'testAuth'});
  assert.deepEqual(m.get('provider'), auth);
});

test('return auth from provider if providerId given', function(assert) {
  assert.equal(model.get('provider'), auth);
});

test('sets and returns the auth provider', function(assert) {
  var newAuth = model.set('provider', auth.get('providerId'));
  assert.equal(auth.get('providerId'), newAuth);
});

test('sets and returns the auth provider', function(assert) {
  model.set('provider', null);
  assert.ok(!model.get('provider'));
  assert.ok(!model.get('auth'));
});

test('isExpired returns false when the token is not expired', function(assert) {
  var stub = sinon.stub(auth, 'accessTokenIsExpired', function() { return false; });
  assert.equal(model.get('isExpired'), false);
  stub.restore();
});

test('isExpired returns true when the token is expired', function(assert) {
  var stub = sinon.stub(auth, 'accessTokenIsExpired', function() { return true; });
  assert.equal(model.get('isExpired'), true);
  stub.restore();
});

test('isNotExpired returns true when the token is expired', function(assert) {
  var stub = sinon.stub(auth, 'accessTokenIsExpired', function() { return false; });
  assert.equal(model.get('isNotExpired'), true);
  stub.restore();
});

test('isNotExpired returns false when the token is expired', function(assert) {
  var stub = sinon.stub(auth, 'accessTokenIsExpired', function() { return true; });
  assert.equal(model.get('isNotExpired'), false);
  stub.restore();
});

test('token property returns the oauth token', function(assert) {
  let token = { provider_id: 'testAuth', expires_in: '12345', scope: 'public', access_token: '12345abc' };
  let stub = sinon.stub(auth, 'getToken', function() { return token; });
  assert.equal(model.get('token'), token);
  stub.restore();
});

test('getToken returns the oauth token', function(assert) {
  let token = { provider_id: 'testAuth', expires_in: '12345', scope: 'public', access_token: '12345abc' };
  let stub = sinon.stub(auth, 'getToken', function() { return token; });
  assert.equal(model.getToken(), token);
  stub.restore();
});

test('accessToken returns the oauth token', function(assert) {
  let token = { provider_id: 'testAuth', expires_in: '12345', scope: 'public', access_token: '12345abc' };
  let stub = sinon.stub(auth, 'getAccessToken', function() { return token.access_token; });
  assert.equal(model.get('accessToken'), token.access_token);
  stub.restore();
});

test('getAccessToken returns the oauth token', function(assert) {
  let token = { provider_id: 'testAuth', expires_in: '12345', scope: 'public', access_token: '12345abc' };
  let stub = sinon.stub(auth, 'getAccessToken', function() { return token.access_token; });
  assert.equal(model.getAccessToken(), token.access_token);
  stub.restore();
});

test('authorize calls authorize method on auth object', function(assert) {
  var mock = sinon.mock(auth);
  mock.expects('authorize').once();
  model.authorize();
  assert.ok(mock.verify());
});
