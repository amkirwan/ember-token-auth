import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EmberTokenAuthENV.locationType
});

Router.map(function() {
  this.route('login');
  this.route('foobar');
  this.route('catchall', {path: '/*wildcard'});
});

export default Router;
