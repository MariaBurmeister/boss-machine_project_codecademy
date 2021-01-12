const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } 
  = require('./db');

const findMinionById = (req, res, next, id) => {
    const idToFind = id;
    const foundMinion =  getFromDatabaseById('minions', idToFind);

    if (foundMinion) {
        req.minion = foundMinion;
        req.minionId = foundMinion.id;
        next();
    } else {
        const minionNotFound = new Error(`Minion with ID ${idToFind} does not exist.`);
        minionNotFound.status = 404;
        res.status(minionNotFound.status).send(minionNotFound.message);
        // return next(minionNotFound);
    }
};


minionsRouter.param('minionId', findMinionById);

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    if (minions) {
        res.status(200).send(minions);
    }
});

minionsRouter.post('/', (req, res, next) => {
    const minionToAdd = req.body;
    const createdMinion = addToDatabase('minions', minionToAdd);

    if (createdMinion) {
        res.status(201).send(createdMinion);
    } else {
        res.status(500).send();
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionUpdate = req.body;
    const updatedMinion = updateInstanceInDatabase('minions', minionUpdate);
    if (updatedMinion) {
        res.status(200).send(updatedMinion);
    } else {
        res.status(500).send();
    };
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.minionId);
    if (deleted) {
        res.status(204).send(`Minion with id ${req.minionId} deleted`);
    } else {
        res.status(500).send();
    };
});


module.exports = minionsRouter;