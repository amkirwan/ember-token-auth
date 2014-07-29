import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EmberTokenAuthENV.locationType
});

Router.map(function() {
});

export default Router;
