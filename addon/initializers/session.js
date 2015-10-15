import Session from '../models/session';

export function initialize(registry/*, app*/) {
  registry.register('session:current', Session, { singleton: true });

  registry.inject('controller', 'sessionCurrent', 'session:current');
  registry.inject('route', 'sessionCurrent', 'session:current');
  registry.inject('adapter', 'sessionCurrent', 'session:current');

}

export default {
  name: 'session',
  initialize: initialize,
  after: 'store'
};
