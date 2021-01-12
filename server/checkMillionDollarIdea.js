// million dollar idea validator:

const checkMillionDollarIdea = (req, res, next) => {
 
    if (!req.body.numWeeks || !req.body.weeklyRevenue) {
        const unavailableInfo = new Error(`Idea must include numWeek and weeklyRevenue properties.`)
        unavailableInfo.status = 400;
        res.status(unavailableInfo.status).send(unavailableInfo.message);
        return;
    } 
    if ( !Number(req.body.numWeeks) || !Number(req.body.weeklyRevenue)) {
        const newIdeatypeError = new Error(`Idea properties numWeek and weeklyRevenue must be of type number.`);
        newIdeatypeError.status = 400;
        res.status(newIdeatypeError.status).send(newIdeatypeError.message);
        return;
    }

    const valueOfIdea = req.body.numWeeks * req.body.weeklyRevenue;
    const aMillion = 1000000;

    if (valueOfIdea < aMillion) {
        const worthlessIdea = new Error(`Ideas must be worth at least ${aMillion} Dollars.`)
        worthlessIdea.status = 400;
        res.status(worthlessIdea.status).send(worthlessIdea.message);
        return;
    }
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
