import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['current-user'],

  logginError: function() {
    // if the loggin error is true update the view
    if (this.get('logginError')) {
      Ember.run.once(this, function() {
        Ember.$('.current-user').html('<p class="error">There was an error logging in. Please try again.</p>');
      });
    }
  }.observes('loginError').on('init')

});
