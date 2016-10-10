import { module } from 'qunit';
import Ember from 'ember';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import Pretender from 'pretender';


const { RSVP: { Promise } } = Ember;
let server;
export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      server = new Pretender(function() {
        this.get('/api/current-user', function() {
          return [200, {"Content-Type": "application/vnd.api+json"}, JSON.stringify({"data":{"type":"users","id":"1","attributes":{"firstname":"foo","lastname":"bar"}}})];
        });
        this.get('/api/current-user-error', function() {
          return [403, {"Content-Type": "application/vnd.api+json"}, JSON.stringify({"errors":[{"status": "422","source":{ "pointer": "/data/attributes/first-name" },"title": "Invalid Attribute","detail": "First name must contain at least three characters."}]})];
        });
      });

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      server.shutdown();
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return Promise.resolve(afterEach).then(() => destroyApp(this.application));
    }
  });
}
