# Ember-Token-Auth

Current Version: **[2.0.1](https://github.com/amkirwan/ember-token-auth/releases/tag/v2.0.1)**

[![Circle CI](https://circleci.com/gh/amkirwan/ember-token-auth.svg?style=svg)](https://circleci.com/gh/amkirwan/ember-token-auth)


This is an [EmberCli](http://www.ember-cli.com/) addon for using the [Ember-OAuth2](https://github.com/amkirwan/ember-oauth2) to handle authentication in your app. 

## Installation

To use the addon with your EmberCli app add it to your package.json file and run the generate to install the bower dependencies.

```
npm install --save-dev ember-token-auth
ember generate ember-token-auth
```

### Getting it to work with your Ember-CLI App

Create an initialzier to setup your Ember-OAuth2 config. For more information checkout the Ember-OAuth2 [README](https://github.com/amkirwan/ember-oauth).

In addition you will need to set the name of the model that the user should be persisted to. In the example setup it is set to `user`.

The intializer should be configured to run `before` the `session` initializer

```javascript 
import Ember from 'ember';
import OAuth2 from 'ember-oauth2';

export function initialize(registry, app) {
  window.EmberENV['ember-oauth2'] = {
    model: 'user',
    google: {
      clientId: "xxxxxxxxxxxx",
      authBaseUri: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: 'https://oauth2-login-demo.appspot.com/oauth/callback',
      scope: 'public write'
    }
  }
}

export default {
  name: 'ember-oauth2-config', 
  before: 'session',
  initialize: initialize
}
```

Ember-Token-Auth addons `session` initializer injects the sessionCurrent object into `controller`, `route` and `adapter` in your application.

To create a protected route that requires authentication define your routes like this: 

```javascript
// app/routes/the-route.js

import Protected from './routes/protected';

export default Protected.extend({
  // your route 
});
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
  sessionCtrl: Ember.inject.controller('session')
  currentUser: Ember.computed.alias("sessionCtrl.currentUser")
});
```

Then from your template you just need to handle the `authenticate` method and pass in the providerId to start the authentication process.

```handlebars
<h2>Ember Token Auth</h2>

<button id="login" {{action 'authenticate' 'google'}}>Sign In</button>
```

Injecting the session controller gives you access to the `currentUser`, `loginError`, and `isAuthenticated` attributes of the session controller.


The current implementation looks for a User model for storing the current logged in user. Over this model in your App to config your user. 

**Session Model**

The session model provides the interface for handling session data via [Ember-OAuth2](https://github.com/amkirwan/ember-oauth2). If you need to interact with the session it provides the following properties:

*methods*
- authorize - Returns a promise with the resolved or rejected response
- signout -  Removes the token from the localstorage and sets the auth and providerId to null on the session model

*properties*
- provider - You can set the provider with the providerId from the OAuth2 config
- isExpired - Returns true if the accessToken is expired otherwise false 
- isNoExpired - Returns true if the accessToken is not expired otherwise false
- token - Return the the token from localstorage saved by EmberOAuth2 if it exists otherwise null
- accessToken - Return the access token property value from the token saved in localstorage

### Optional Config

If there is an error authorizing the user and getting the user information the session controller will set the loginError property defined in it to true. One way to handle the loggin error is to define a session view the observes the controllers loginError property. Here is one way to show the user that an error occurred logging in: 

*app/templates/application.hbs*
```javascript
<h2 id='title'>Welcome to Ember.js</h2>

{{current-session currentUser=sessionCtrl.currentUser loginError=sessionCtrl.loginError}}

{{outlet}}
```


*app/components/current-session.js*
```javascript
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
```

## Running Ember-Token-Auth and the tests

* `git clone https://github.com/amkirwan/ember-token-auth.git`
* `npm install -g ember-cli bower phantomjs`
* `npm install && bower install`
* `ember serve`
* visit `http://localhost:4200` to run the demo test dummy app.
* visit `http://localhost:4200/tests` to run the tests


## Building

* `ember build`

For more information on using ember-cli, visit [EmberCli](http://www.ember-cli.com/)
