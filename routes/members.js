/**
 * Members routes
 * 
 * @module routes/members
 * @author Lewis Stokes
 * @description Routes for requests by member
 */


const exp = require('express');
const router = new exp.Router();

const model = require('../models/members');


/**
 * getMembers
 * 
 * @description Returns a list of Members of parliament
 * @param {object} req - HTTP Request object
 * @param {object} res - HTTP Resonse object
 */
router.get('/MPs', async (req, res) => {
    data = await model.ListMPs();
    res.status(200);
    res.send(data);
})



/**
 * getMPVotes
 * 
 * @description Returns a list of votes from an MP
 * @param {object} req - HTTP Request object
 * @param {object} res - HTTP Resonse object
 */
router.get('/votes/:id', async (req, res) => {

    let id = Number(req.params.id);
    if (id == NaN) {
        throw new Error(`getMPVotes Route - ID must be a valid integer value, '${req.params.id}' supplied`);
        return null;
    }

    let data = await model.ListVotes(id);

    res.status(200);
    res.send(data);
})


module.exports = router;