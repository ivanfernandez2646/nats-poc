import { Server } from './server';

export class CmsBackendApp {
  private server?: Server;

  async start() {
    const port = process.env.PORT || '9000';
    this.server = new Server(port);
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
