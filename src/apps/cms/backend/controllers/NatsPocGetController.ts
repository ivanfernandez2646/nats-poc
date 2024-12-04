import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';

import { RandomData } from '../../../../contexts/cms/shared/domain/RandomData';
import { RandomDataRepository } from '../../../../contexts/cms/shared/domain/RandomDataRepository';

export default class NatsPocGetController implements Controller {
  constructor(private readonly repository: RandomDataRepository) {}

  async run(req: Request, res: Response) {
    const randomData = new RandomData();
    await this.repository.save(randomData);

    res.status(httpStatus.OK).send();
  }
}
