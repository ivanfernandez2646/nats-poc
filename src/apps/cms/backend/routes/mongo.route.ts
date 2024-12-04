import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import MongoPocGetController from '../controllers/MongoPocGetController';

export const register = (router: Router) => {
  const controller: MongoPocGetController = container.get('Apps.cms.controllers.MongoPocGetController');
  router.get('/mongo', (req: Request, res: Response) => controller.run(req, res));
};
