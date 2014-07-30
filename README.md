# Ember-token-auth

## Warning

This is a work in progress, use at your own risk.

## Installation

This is an [ember-cli](/stefanpenner/ember-cli) addon that demonstrates how to use [Ember-OAuth2](/amkirwan/ember-oauth) library
for authentication in you app. 

Currently this addon uses a custom branch of ember-cli for using addons with your application. Once the addon setup is ready
in official ember-cli release the addon will be changed to use that branch. 

To use this addon with an ember-cli app add it to your package json devDependencies:

```json
"devDependencies": {
  "ember-token-auth": "amkirwan/ember-token-auth"
}
```

### Getting it work with your Ember-CLI App

Create an initialzier to setup your Ember-OAuth2 config

```javascript 
import Ember from 'ember';

export default {
  name 'ember-oauth2-config', 

  initialize: function(/*container, app*/) {
    Ember.OAuth2.config = {
      google: {
        clientId: "xxxxxxxxxxxx",
        authBaseUri: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: 'https://oauth2-login-demo.appspot.com/oauth/callback',
        scope: 'public write'
      }
    }
  }
}
```

To define a protected route that requires authentication define your routes like this : 

```javascript
import Protected from 'your-app-namespace/routes/protected';

export default Protected.extend();
```

Add the Session controller available to your controllers in the `Application.js` controller
```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['session']
});
```

The current implementation looks for a User model for storing the current logged in user. Overriding this
model in your App to config your user. 


### Optional Config

If there is an error authorizing the user and getting the user information the session controller will set the loginError property defined in it to true. One way to handle the loggin error is to define a session view the observes the controllers loginError property. Here is one way to show the user that an error occurred logging in: 

```javascript
import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'session',

  loginError: function() {
    if (this.get('controller.loginError')) {
      Ember.run.once(this, function() {
        Ember.$('#current-user').html('<p classs="error">There was an error logging in.</p>');
      });
    }
  }.observes('controller.loginError')
});
```


## Running Ember-Token-Auth and the tests

* `git clone https://github.com/amkirwan/ember-token-auth.git`
* `ember serve`
* visit `http://localhost:4200` to run the demo test dummy app.
* visit `http://localhost:4200/tests` to run the tests

## Building

* `ember build`

For more information on using ember-cli, visit [http://iamstef.net/ember-cli/](http://iamstef.net/ember-cli/).
