import { ContainerBuilder, Definition, Reference } from 'node-dependency-injection';

import MongoClientFactory from '../../../../../contexts/cms/shared/infrastructure/persistence/mongo/MongoClientFactory';
import InMemoryAsyncEventBus from '../../../../../contexts/cms/shared/infrastructure/eventBus/inMemory/InMemoryAsyncEventBus';
import MongoConfigFactory from '../../../../../contexts/cms/shared/infrastructure/persistence/mongo/MongoConfigFactory';
import { MongoRandomDataRepository } from '../../../../../contexts/cms/shared/infrastructure/persistence/mongo/MongoRandomDataRepository';
import NatsJetstreamConfigFactory from '../../../../../contexts/cms/shared/infrastructure/persistence/nats_jetstream/NatsJetstreamConfigFactory';
import { NatsJetstreamRandomDataRepository } from '../../../../../contexts/cms/shared/infrastructure/persistence/nats_jetstream/NatsJetstreamRandomDataRepository';
import NatsJetstreamClientFactory from '../../../../../contexts/cms/shared/infrastructure/persistence/nats_jetstream/NatsJetstreamClientFactory';

const register = (container: ContainerBuilder) => {
  const mongoConfigDefinition = new Definition();
  mongoConfigDefinition.setFactory(MongoConfigFactory, 'createConfig');
  container.setDefinition('Shared.MongoConfig', mongoConfigDefinition);

  const mongoClientFactoryDefinition = new Definition();
  mongoClientFactoryDefinition.setFactory(MongoClientFactory, 'createClient');
  mongoClientFactoryDefinition.addArgument('daily-trends');
  mongoClientFactoryDefinition.addArgument(new Reference('Shared.MongoConfig'));
  container.setDefinition('Shared.MongoClientFactory', mongoClientFactoryDefinition);

  container
    .register('Shared.MongoRandomDataRepository', MongoRandomDataRepository)
    .addArgument(new Reference('Shared.MongoClientFactory'));

  const natsJetstreamConfigDefinition = new Definition();
  natsJetstreamConfigDefinition.setFactory(NatsJetstreamConfigFactory, 'createConfig');
  container.setDefinition('Shared.NatsJetstreamConfig', natsJetstreamConfigDefinition);

  const natsJetstreamClientFactoryDefinition = new Definition();
  natsJetstreamClientFactoryDefinition.setFactory(NatsJetstreamClientFactory, 'createClient');
  natsJetstreamClientFactoryDefinition.addArgument('daily-trends');
  natsJetstreamClientFactoryDefinition.addArgument(new Reference('Shared.NatsJetstreamConfig'));
  container.setDefinition('Shared.NatsJetstreamClientFactory', natsJetstreamClientFactoryDefinition);

  container
    .register('Shared.NatsJetstreamRandomDataRepository', NatsJetstreamRandomDataRepository)
    .addArgument(new Reference('Shared.NatsJetstreamClientFactory'));
  container.getDefinition('Shared.NatsJetstreamRandomDataRepository').addMethodCall('initialize', []);

  container.register('Shared.EventBus', InMemoryAsyncEventBus);
};

export default register;
