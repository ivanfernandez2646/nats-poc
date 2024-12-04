import { ContainerBuilder, Reference } from 'node-dependency-injection';
import StatusGetController from '../../controllers/StatusGetController';
import sharedDI from './shared';
import NatsPocGetController from '../../controllers/MongoPocGetController';
import MongoPocGetController from '../../controllers/MongoPocGetController';

const register = (container: ContainerBuilder) => {
  sharedDI(container);
  container.register('Apps.cms.controllers.StatusGetController', StatusGetController);
  container
    .register('Apps.cms.controllers.NatsPocGetController', NatsPocGetController)
    .addArgument(new Reference('Shared.NatsJetstreamRandomDataRepository'));
  container
    .register('Apps.cms.controllers.MongoPocGetController', MongoPocGetController)
    .addArgument(new Reference('Shared.MongoRandomDataRepository'));
};

export default register;
