import * as express from 'express';
import { Router } from 'express';
import mailer from './Mailer';

class App {
  public express
  public swaggerUi;

  constructor() {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes(): void {

    const router : Router = express.Router()

    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })

    this.express.use('/', router)
    this.express.use('/birds', mailer)

    this.express.listen(3000, () => {
      console.log('connected! on part 3000');
    })
  }
}

export default new App().express