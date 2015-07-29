import Session from '../models/session';

export function initialize(registry/*, app*/) {
  registry.register('session:current', Session, { singleton: true });

  registry.injection('controller', 'session', 'session:current');
  registry.injection('route', 'session', 'session:current');
  registry.injection('adapter', 'session', 'session:current');

}

export default {
  name: 'session',
  initialize: initialize,
  after: 'store'
};
