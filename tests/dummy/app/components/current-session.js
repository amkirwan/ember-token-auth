import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['current-user'],
  loginError: false,

  didInsertElement: function() {
    Ember.addObserver(this, 'loginError', this, this.loginErrorChanged);
  },

  loginErrorChanged: function(/*comp, value*/) {
    if (this.get('loginError')) {
      Ember.run.once(this, function() {
        Ember.$('.current-user').html('<p class="error">There was an error logging in. Please try again.</p>');
      });
    }
  }

});
