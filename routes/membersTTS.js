/**
 * MembersTTS routes for Text To Speech data
 * 
 * @module routes/membersTTS
 * @author Lewis Stokes
 * @description Routes for requests by member
 */


const exp = require('express');
const router = new exp.Router();

const model = require('../models/membersTTS');


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

    let data = await model.ListVotesTTS(id);

    console.log(data)

    if (data != null) {
        res.status(200);
        res.send(data);
    } else {
        res.status(500);
        res.send('Internal Server Error');
    }

    
})


module.exports = router;