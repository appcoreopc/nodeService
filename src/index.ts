import * as express from 'express';
import { Router } from 'express';
import mailer from './Mailer';
import { bodyParser } from 'body-parser';

class App {
  public express;
  public expressParser; 

  constructor() {
    this.express = express()
    this.expressParser = express.json();
    
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
    this.express.use(this.expressParser);

  
    this.express.use('/mail', mailer)

    this.express.listen(3000, () => {
      console.log('connected! on part 3000');
    })
  }
}
// same as 
// new App();
export default new App().express