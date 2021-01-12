const express = require('express');
const minionsRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } 
  = require('./db');

const findMinionById = (req, res, next, id) => {
    const foundMinion =  getFromDatabaseById('minions', id);

    if (!foundMinion) {
        const minionNotFound = new Error(`Minion with ID ${id} does not exist.`);
        minionNotFound.status(404);
        return next(minionNotFound);
    }
    req.minionId = id;
    req.minion = foundMinion;
    next();
};


minionsRouter.param('minionId', findMinionById);

// minionsRouter.get('/', (req, res, next) => {});
// minionsRouter.post('/', (req, res, next) => {});
// minionsRouter.get('/:minionId', (req, res, next) => {
//     res.send(req.minion);
// });
// minionsRouter.put('/:minionId', (req, res, next) => {
//     const minionUpdate = req.query;

//     const updatedMinion = updateInstanceInDatabase('minions', updatedMinion);
//     res.status(201).send(updatedMinion);
// });
// minionsRouter.delete('/:minionId', (req, res, next) => {});


module.exports = minionsRouter;