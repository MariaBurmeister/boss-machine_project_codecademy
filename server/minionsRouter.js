const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

// id validator:

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
    }
};
minionsRouter.param('minionId', findMinionById);


// CRUD middleware:

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
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.minionId);
    if (deleted) {
        res.status(204).send(`Minion with id ${req.minionId} deleted`);
    } else {
        res.status(500).send();
    };
});

// router for '/work' routes:
const workRouter = require('./workRouter');
minionsRouter.use('/:minionId/Work', workRouter);

module.exports = minionsRouter;