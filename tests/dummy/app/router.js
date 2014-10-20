import Ember from 'ember';

var Router = Ember.Router.extend({
  location: 'none'
});

Router.map(function() {
  this.route('login');
  this.route('foobar');
  this.route('catchall', {path: '/*wildcard'});
});

export default Router;
