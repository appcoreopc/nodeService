import * as express from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', function(req, res) {
    res.json({
        message: 'Selamat World!'
      })
});

router.get('/:id', function(req, res) {
    res.json({
        message: 'Hello World!'
      })
});

export default router;

