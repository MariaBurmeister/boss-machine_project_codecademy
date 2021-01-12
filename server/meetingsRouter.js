const express = require('express');
const meetingsRouter = express.Router();

const {
    getAllFromDatabase,
    addToDatabase,
    createMeeting,
    // updateInstanceInDatabase,
    // deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('./db');

// routes middleware:

meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    if (meetings) {
        res.status(200).send(meetings);
    }
});

meetingsRouter.post('/', (req, res, next) => {
    const meetingToAdd = createMeeting();
    const createdMeeting = addToDatabase('meetings', meetingToAdd);

    if (createdMeeting) {
        res.status(201).send(createdMeeting);
    }
});

meetingsRouter.delete('/', (req, res, next) => {
    const deletedAllMeetings = deleteAllFromDatabase('meetings');
    if (deletedAllMeetings) {
        res.status(204).send('All meetings deleted.');
    } else {
        res.status(500).send();
    }
});


module.exports = meetingsRouter;