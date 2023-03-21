/**
 * Debug routes
 * 
 * @module routes/Debug
 * @author Lewis Stokes
 */


const exp = require('express');
const router = new exp.Router();



/**
 * HelloWorld
 * 
 * @description Returns "Hello World"
 * @param {object} req - HTTP Request object
 * @param {object} res - HTTP Resonse object
 */
router.get('/', (req, res) => {
    res.status(200);
    res.send('Hello World!')
})



module.exports = router;