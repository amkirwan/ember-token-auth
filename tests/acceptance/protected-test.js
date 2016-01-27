import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App;
var server;

module('Acceptance: Protected', {
  setup: function() {
    if (window.localStorage.getItem('token-testAuth')) {
      window.localStorage.removeItem('token-testAuth');
    }
    App = startApp();

    server = new Pretender(function() {
      this.get('/api/current-user', function() {
        return [200, {"Content-Type": "application/vnd.api+json"}, JSON.stringify({"data":{"type":"users","id":"1","attributes":{"firstname":"foo","lastname":"bar"}}})];
      });
    });
  },

  teardown: function() {
    window.history.pushState('','','/tests');
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('visiting /foobar', function(assert) {
  visit('/foobar');

  andThen(function() {
    assert.equal(currentPath(), 'login');
  });
});

test('visiting /foobar then logging should redirect back to /foobar', function(assert) {
  visit('/foobar');
  click('button#login');


  andThen(function() {
    assert.equal(currentPath(), 'foobar');
  });
});
