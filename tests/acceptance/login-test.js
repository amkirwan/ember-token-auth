import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login');

test('visiting /login when there is not valid login should not redirect', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /login should redirect to index when there is a valid login', function(assert) {
  visit('/login');
  click('button#login');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('log in is successful but current_user returns error', function(assert) {

  window.EmberENV['ember-oauth2'].testAuth.currentUser = window.EmberENV['ember-oauth2'].testAuth.currentUserError;

  visit('/login');
  click('button#login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
    assert.equal(find('p.error').text(), 'There was an error logging in. Please try again.');
  });
});
