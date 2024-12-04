import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import NatsPocGetController from '../controllers/MongoPocGetController';

export const register = (router: Router) => {
  const controller: NatsPocGetController = container.get('Apps.cms.controllers.NatsPocGetController');
  router.get('/nats', (req: Request, res: Response) => controller.run(req, res));
};
