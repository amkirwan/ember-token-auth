import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';
import Session from 'ember-token-auth/models/session';
import {config, auth, reopenConfig} from 'ember-token-auth/tests/helpers/ember-oauth2';

var model;

moduleForModel('session:current', 'Session Model', {
  setup: function() {
    model = Session.create();
    model.set('auth', auth); /* set the auth object because generating it in Session.create() will cause tests to fail that compaire auth */
  }
});

test('it exists', function() {
  ok(model);
});

test('return auth from provider if providerId given', function() {
  equal(model.provider(), auth);
});

test('sets and returns the auth provider', function() {
  var newAuth = model.provider(auth.get('providerId'));
  equal(auth.get('providerId'), newAuth.get('providerId'));
});

test('isExpired returns false when the token is not expired', function() {
  var stub = sinon.stub(auth, 'accessTokenIsExpired', function() { return false; });
  equal(model.isExpired(), false);
  stub.restore();
});

test('isExpired returns true when the token is expired', function() {
  var stub = sinon.stub(auth, 'accessTokenIsExpired', function() { return true; });
  equal(model.isExpired(), true);
  stub.restore();
});

test('isNotExpired returns true when the token is expired', function() {
  var stub = sinon.stub(auth, 'accessTokenIsExpired', function() { return false; });
  equal(model.isNotExpired(), true);
  stub.restore();
});

test('isNotExpired returns false when the token is expired', function() {
  var stub = sinon.stub(auth, 'accessTokenIsExpired', function() { return true; });
  equal(model.isNotExpired(), false);
  stub.restore();
});

test('getToken returns the oauth token', function() {
  var stub = sinon.stub(auth, 'getToken', function() { return '12345'; });
  equal(model.getToken(), '12345');
  stub.restore();
});

test('authorize calls authorize method on auth object', function() {
  var mock = sinon.mock(auth);
  mock.expects('authorize').once();
  model.authorize();
  ok(mock.verify());
});
