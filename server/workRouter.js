const express = require('express');
const workRouter = express.Router({mergeParams: true});

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

const getMinionsWork = (req, res, next) => {
    const minion = req.params.minion;
    const allWork = getAllFromDatabase('work');
    const minionsWork =  allWork.filter((work) => work.minionId === req.params.minionId);
    if (minionsWork.length) {
        req.minionsWork = minionsWork;
        next();
    } else {
        res.status(404).send(`No work exists for minion ${minion} with id ${req.params.minionId}`);
    };
};

// const findWork = (req, res, next, id) => {
//     const foundWork = req.minionsWork.find((work) => work.id === id);
//     if (foundWork) {
//         req.work = foundWork;
//         req.workId = foundWork.id;
//         next();
//     } else {
//         res.status(400).send(`No work with id ${id} exists for minion ${minion}.`);
//     };
// };
// workRouter.param('workId', findWork);

workRouter.get('/', getMinionsWork, (req, res, next) => {
   res.status(200).send(req.minionsWork);
});

workRouter.post('/', (req, res, next) => {
    const minionId = req.minionId;
    const createdWork = addToDatabase('work', req.body);
    createdWork.minionId = minionId;
    if (createdWork) {
        res.status(201).send(createdWork);
    }
});

workRouter.put('/:workId', getMinionsWork, (req, res, next) => {
    const foundWork = req.minionsWork.find(work => work.id === req.params.workId);
    const minionId = req.minionId;
    console.log(req.minionId);
    if (foundWork) {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        updatedWork.minionId = minionId;
        res.status(201).send(updatedWork);
    } else {
        res.status(400).send(`Bad request: no work with id ${req.params.workId} exists for minion with id ${minionId}`)
    }
});

workRouter.delete('/:workId', getMinionsWork, (req, res, next) => {
    const foundWork = req.minionsWork.find(work => work.id === req.params.workId);
    if (foundWork) {
        const deleted = deleteFromDatabasebyId('work', foundWork.id);
        if (deleted) {
            res.status(204).send('Work deleted.');
        } else {
            res.status(500).send;
        }
    } else {
        res.status(400).send(`Bad request: no work with id ${req.params.workId} exists for minion with id ${minionId}`)
    }
});

module.exports = workRouter;