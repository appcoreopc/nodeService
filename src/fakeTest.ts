import * as express from 'express';
import { Router } from 'express';
import axios from 'axios';

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

        axios.get('http://localhost:3333/')
        .then(function (response) {
          // handle success

          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
          console.log('finally');
        });

      console.log('carrying on....');
      
      res.json({
        message: 'Hello World!'
      })
    })

    this.express.use('/', router)
    this.express.use(this.expressParser);
  
    this.express.listen(3000, () => {
      console.log('connected! on part 3000');
    })
  }
}
// same as 
// new App();
export default new App().express