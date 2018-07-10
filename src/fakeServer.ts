import * as express from 'express';
import { Router } from 'express';

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

      return new Promise(resolve => {
         setTimeout(() => {
          resolve('resolved');
          res.json({
            message: 'done!'
          })
        }, 2000);
      });   
    })

    this.express.use('/', router)
   
    this.express.listen(3333, () => {
      console.log('connected! on part 3333');
    })
  }
}

export default new App().express