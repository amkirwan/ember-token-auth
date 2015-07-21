import DS from 'ember-data';
import ajax from 'ic-ajax';

export default DS.JSONAPIAdapter.extend({

  currentUser: function() {
    return ajax(this.get('session.auth.currentUser'));
  },

  tokeninfo: function() {
    return ajax(this.get('session.auth.tokeninfo'));
  }

});
