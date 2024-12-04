import configConvict from '../../../../../../apps/cms/backend/config/config';
import { NatsJetstreamConfig } from './NatsJetstreamClientFactory';

export default class NatsJetstreamConfigFactory {
  static createConfig(): NatsJetstreamConfig {
    return configConvict.get('natsJetstream');
  }
}
