import { RandomData } from '../../../domain/RandomData';
import { RandomDataRepository } from '../../../domain/RandomDataRepository';
import { MongoRepository } from './MongoRepository';

export class MongoRandomDataRepository extends MongoRepository<RandomData> implements RandomDataRepository {
  protected collectionName(): string {
    return 'random_datas';
  }

  save(randomData: RandomData): Promise<void> {
    return this.persist(randomData.id, randomData);
  }
}
