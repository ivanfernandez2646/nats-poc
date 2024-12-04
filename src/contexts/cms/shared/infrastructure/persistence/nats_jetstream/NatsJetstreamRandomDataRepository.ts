import { RandomData } from '../../../domain/RandomData';
import { RandomDataRepository } from '../../../domain/RandomDataRepository';
import { NatsJetstreamRepository } from './NatsJetstreamRepository';

export class NatsJetstreamRandomDataRepository
  extends NatsJetstreamRepository<RandomData>
  implements RandomDataRepository
{
  save(randomData: RandomData): Promise<void> {
    return this.persist(randomData.id, randomData);
  }
}
