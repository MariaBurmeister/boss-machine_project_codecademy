const express = require('express');
const ideasRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

// id validator:

const findIdeaById = (req, res, next, id) => {
    const idToFind = id;
    const foundIdea =  getFromDatabaseById('ideas', idToFind);

    if (foundIdea) {
        req.idea = foundIdea;
        req.ideaId = foundIdea.id;
        next();
    } else {
        const ideaNotFound = new Error(`Idea with ID ${idToFind} does not exist.`);
        ideaNotFound.status = 404;
        res.status(ideaNotFound.status).send(ideaNotFound.message);
    }
};
ideasRouter.param('ideaId', findIdeaById);

// CRUD middleware:

ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    if (ideas) {
        res.status(200).send(ideas);
    }
});

ideasRouter.post('/', (req, res, next) => {
    const ideaToAdd = req.body;
    const createdIdea = addToDatabase('ideas', ideaToAdd);

    if (createdIdea) {
        res.status(201).send(createdIdea);
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const ideaUpdate = req.body;
    const updatedIdea = updateInstanceInDatabase('ideas', ideaUpdate);
    if (updatedIdea) {
        res.status(200).send(updatedIdea);
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.ideaId);
    if (deleted) {
        res.status(204).send(`Idea with id ${req.ideaId} deleted`);
    } else {
        res.status(500).send();
    };
});


module.exports = ideasRouter;