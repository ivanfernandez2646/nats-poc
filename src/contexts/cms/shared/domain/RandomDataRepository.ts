import { RandomData } from './RandomData';

export interface RandomDataRepository {
  save(randomData: RandomData): Promise<void>;
}
