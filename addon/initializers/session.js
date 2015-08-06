import Session from '../models/session';

export function initialize(registry/*, app*/) {
  registry.register('session:current', Session, { singleton: true });

  registry.injection('controller', 'sessionCurrent', 'session:current');
  registry.injection('route', 'sessionCurrent', 'session:current');
  registry.injection('adapter', 'sessionCurrent', 'session:current');

}

export default {
  name: 'session',
  initialize: initialize,
  after: 'store'
};
