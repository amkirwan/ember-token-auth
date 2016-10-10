import Session from '../models/session';

export function initialize(app) {
  app.register('session:current', Session, { singleton: true });

  app.inject('controller', 'sessionCurrent', 'session:current');
  app.inject('route', 'sessionCurrent', 'session:current');
  app.inject('adapter', 'sessionCurrent', 'session:current');
}

export default {
  name: 'session',
  initialize: initialize,
  after: 'store'
};
