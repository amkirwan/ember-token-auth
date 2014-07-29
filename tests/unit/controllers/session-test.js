// import Ember from 'ember';
// import DS from 'ember-data';
// import User from 'ember-token-auth/models/user';
// import { test, moduleFor } from 'ember-qunit';
// import {auth, session, reopenConfig} from 'ember-token-auth/tests/helpers/ember-oauth2';

// var container;
// var store;

// moduleFor('controller:session', 'SessionController', {
//   needs: ['controller:session', 'model:user'],
//   setup: function() { 
//     container = new Ember.Container(); 
//     container.register('store:main', DS.Store.extend());
//     container.register('serializer:-default', DS.JSONSerializer);
//     container.register('serializer:-rest', DS.RESTSerializer);
//     container.register('adapter:-rest', DS.RESTAdapter);
//     container.injection('serializer', 'store', 'store:main');

//     container.register('model:user', User);
//     store = container.lookup('store:main');
//   }
// });

// // Replace this with your real tests.
// test('it exists', function() {
//   var controller = this.subject();
//   ok(controller);
// });

// test('loadUser', function() {
//   var ctrl = this.subject();
//   ctrl.set('session', session);
//   ctrl.set('store', store);

//   var transition = sinon.stub(ctrl, 'transitionToRoute', function() { return true; } );

//   ctrl.loadUser();
    
//   transition.restore();
// });
