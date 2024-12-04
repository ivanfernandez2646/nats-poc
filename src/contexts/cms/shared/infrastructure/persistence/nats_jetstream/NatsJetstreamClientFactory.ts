import { connect, JetStreamClient } from 'nats';

export type NatsJetstreamConfig = { url: string };

export default class NatsJetstreamClientFactory {
  private static clients: { [key: string]: JetStreamClient } = {};

  static async createClient(contextName: string, config: NatsJetstreamConfig): Promise<JetStreamClient> {
    let client = NatsJetstreamClientFactory.getClient(contextName);

    if (!client) {
      client = await NatsJetstreamClientFactory.createAndConnectClient(config);

      NatsJetstreamClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): JetStreamClient | null {
    return NatsJetstreamClientFactory.clients[contextName];
  }

  private static async createAndConnectClient(config: NatsJetstreamConfig): Promise<JetStreamClient> {
    const client = await connect({
      servers: config.url
    });

    return client.jetstream();
  }

  private static registerClient(client: JetStreamClient, contextName: string): void {
    NatsJetstreamClientFactory.clients[contextName] = client;
  }
}
