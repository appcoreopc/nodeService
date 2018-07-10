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

  private async mountRoutes(): Promise<any> {

    const router : Router = express.Router()

    router.get('/', (req, res) => {
    
     console.log('here we go...4');
     var result = this.execFunc();
     console.log('called completed');

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

  private resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

  private async execFunc() : Promise<any> {

      let result = await this.execGet();
      console.log('data values');
      console.log(result);
      console.log("finally waiting is done !!");
      
      return result;

      return new Promise(resolve => {
         resolve(result);
      });

  }

  private execGet(): Promise<boolean> { 

    return new Promise(resolve => {

        axios.get('http://localhost:3333/')
        .then(function (response) {
          // handle success

          console.log('service completed ok');
          return resolve(true);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          return resolve(false);
        })
        .then(function () {
          // always executed
          console.log('finally');
        });

      console.log('carrying on....');
      
    //   res.json({
    //     message: 'Hello World!'
    //   })
        
      });

      
  }
}
// same as 
// new App();
export default new App().express
