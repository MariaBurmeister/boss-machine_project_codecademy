const express = require('express');
const apiRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

apiRouter.use(bodyParser.json());
apiRouter.use(cors());


module.exports = apiRouter;
