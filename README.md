# Ember-token-auth

Current Version: **[0.0.6](https://github.com/amkirwan/ember-token-auth/releases/tag/v0.0.6)**

## Warning

This is a work in progress, use at your own risk.

This is an [EmberCli](http://www.ember-cli.com/#developing-addons-and-blueprints) addon that demonstrates how to use [Ember-OAuth2](https://github.com/amkirwan/ember-oauth2) library for authentication in you app. 

## Installation

To use the addon with your EmberCli app add it to your package.json file and run the generate to install the bower dependencies.

```
npm install --save-dev ember-token-auth
ember generate ember-token-auth
```

### Getting it to work with your Ember-CLI App

Create an initialzier to setup your Ember-OAuth2 config. For more information checkout the Ember-OAuth2 [README](https://github.com/amkirwan/ember-oauth).

In addition you will need to set the name of the model that the user should be persisted to. In the example setup it is set to `user`.

```javascript 
import Ember from 'ember';
import OAuth2 from 'ember-oauth2';

export default {
  name 'ember-oauth2-config', 

  initialize: function(/*container, app*/) {
    window.EmberENV['ember-oauth2'] = {
      model: 'user',
      google: {
        clientId: "xxxxxxxxxxxx",
        authBaseUri: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: 'https://oauth2-login-demo.appspot.com/oauth/callback',
        scope: 'public write'
      }
    };
  }
}
```

To create a protected route that requires authentication define your routes like this: 

```javascript
// app/routes/the-route.js

import Protected from './routes/protected';

export default Protected.extend();
```

Depending on the needs of your app you can create a protected route by importing it from `ember-token-auth` a few different ways. For more information checkout the [EmberCli Addon](http://www.ember-cli.com/#developing-addons-and-blueprints) docs.

```javascript
import Protected from './routes/protected';
// or 
import Protected from 'app-module-prefix/routes/protected';
// or
import Protected from 'ember-token-auth/routes/protected';
```

Add the Session controller available to your controllers in the `Application.js` controller.

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

For more information on using ember-cli, visit [EmberCli](http://www.ember-cli.com/)
