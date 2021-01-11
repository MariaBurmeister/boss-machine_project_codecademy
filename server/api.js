const express = require('express');
const apiRouter = express.Router();
const bodyParser = require('body-parser');

apiRouter.use(bodyParser.json());


module.exports = apiRouter;
