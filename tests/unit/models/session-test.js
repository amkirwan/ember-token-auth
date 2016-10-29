import { test, moduleFor } from 'ember-qunit';

moduleFor('model:session', 'Unit | Model | session', {
  unit: true,
  needs: ['service:ember-oauth2'],
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
      },
      otherTestAuth: {
        clientId: 'abcde',
        authBaseUri: '/oauth/authorize',
        redirectUri: '/oauth/callback',
        currentUser: '/api/current-user',
        currentUserError: '/api/current-user-error', 
        tokeninfo: '/oauth/token/info',
        scope: 'public'
      }
    };
  }
});

test('it exists', function(assert) {
  const session = this.subject();
  assert.ok(session);
});

test('set the provider for authorization', function(assert) {
  const session = this.subject();
  session.set('provider', 'testAuth');
  assert.equal(session.get('provider'), 'testAuth');
});

test('sets the correct authorization config', function(assert) {
  const session = this.subject();
  session.set('provider', 'testAuth');
  assert.deepEqual(session.get('auth.providerConfig'), window.EmberENV['ember-oauth2']['testAuth']);
});

test('sets a new provider', function(assert) {
  const session = this.subject();
  session.set('provider', 'testAuth');
  session.set('provider', 'otherTestAuth');
  assert.deepEqual(session.get('auth.providerConfig'), window.EmberENV['ember-oauth2']['otherTestAuth']);
});

test('isExpired returns false when the token is not expired', function(assert) {
  const session = this.subject();
  session.set('provider', 'testAuth');
  let stub = sinon.stub(session.get('auth'), 'accessTokenIsExpired', function() { return false; });
  assert.equal(session.get('isExpired'), false);
  stub.restore();
});


test('isExpired returns true when the token is expired', function(assert) {
  const session = this.subject();
  session.set('provider', 'testAuth');
  let stub = sinon.stub(session.get('auth'), 'accessTokenIsExpired', function() { return true; });
  assert.equal(session.get('isExpired'), true);
  stub.restore();
});

test('isNotExpired returns true when the token is expired', function(assert) {
  const session = this.subject();
  session.set('provider', 'testAuth');
  let stub = sinon.stub(session.get('auth'), 'accessTokenIsExpired', function() { return false; });
  assert.equal(session.get('isNotExpired'), true);
  stub.restore();
});

test('isNotExpired returns false when the token is expired', function(assert) {
  const session = this.subject();
  session.set('provider', 'testAuth');
  let stub = sinon.stub(session.get('auth'), 'accessTokenIsExpired', function() { return true; });
  assert.equal(session.get('isNotExpired'), false);
  stub.restore();
});

test('token property returns the oauth token', function(assert) {
  let token = { provider_id: 'testAuth', expires_in: '12345', scope: 'public', access_token: '12345abc' };
  const session = this.subject();
  session.set('provider', 'testAuth');
  let stub = sinon.stub(session.get('auth'), 'getToken', function() { return token; });
  assert.equal(session.get('token'), token);
  stub.restore();
});

test('accessToken returns the oauth token', function(assert) {
  let token = { provider_id: 'testAuth', expires_in: '12345', scope: 'public', access_token: '12345abc' };
  const session = this.subject();
  session.set('provider', 'testAuth');
  let stub = sinon.stub(session.get('auth'), 'getAccessToken', function() { return token.access_token; });
  assert.equal(session.get('accessToken'), token.access_token);
  stub.restore();
});

test('authorize calls authorize method on auth object', function(assert) {
  const session = this.subject();
  session.set('provider', 'testAuth');
  let stub = sinon.stub(session.get('auth'), 'authorize', function() { return true; });
  session.authorize();
  assert.ok(stub.calledOnce);
});

test('signout destroys auth session', function(assert) {
  assert.expect(2);
  const session = this.subject();
  session.set('provider', 'testAuth');
  let stub = sinon.stub(session.get('auth'), 'removeToken', function() { return true; });
  session.signout();
  assert.ok(stub.calledOnce);
  assert.notOk(session.get('auth'));
});
