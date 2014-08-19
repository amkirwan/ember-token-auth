import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  currentUser: function() {
    return new Ember.RSVP.Promise(function() {
      throw new Error("The session adapter must implement 'currentUser'"); 
    });
  },

  tokeninfo: function() {
    return new Ember.RSVP.Promise(function() {
      throw new Error("The session adapter must implement 'tokeninfo'");
    });
  }
});
