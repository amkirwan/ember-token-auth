import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Accetance | protected routes', {
  beforeEach() {
    window.localStorage.removeItem('token-testAuth');
  }
});

test('visiting /foobar', function(assert) {
  visit('/foobar');

  andThen(function() {
    assert.equal(currentPath(), 'login');
  });
});

test('visiting /foobar then logging should redirect back to /foobar', function(assert) {
  assert.expect(2);

  visit('/foobar');
  andThen(function() {
    assert.equal(currentPath(), 'login');
    click('button#login');
  });

  andThen(function() {
    assert.equal(currentPath(), 'foobar');
  });
});
