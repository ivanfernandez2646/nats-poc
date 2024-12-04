import { JetStreamClient } from 'nats';
import AggregateRoot from '../../../domain/AggregateRoot';

export abstract class NatsJetstreamRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<JetStreamClient>) {}

  protected async initialize(): Promise<void> {
    const client = await this.client();
    const jsm = await client.jetstreamManager();

    const cfg = {
      name: 'EVENTS',
      subjects: ['events.>']
    };

    await jsm.streams.add(cfg);
  }

  protected client(): Promise<JetStreamClient> {
    return this._client;
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const js = await this.client();

    await js.publish(`events.tpf_${id}`, JSON.stringify(aggregateRoot.toPrimitives()));
  }
}
