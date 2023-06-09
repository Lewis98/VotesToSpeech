require('dotenv').config();

const express = require('express');
const app = new express();

const port = process.env.PORT || 3000;


/* - - - Routes - - - */
const debug = require('./routes/debug');
app.use(debug);


const members = require('./routes/members');
app.use(members);


const membersTTS = require('./routes/membersTTS');
app.use('/TTS', membersTTS);



console.log(`Listening on Port '${port}'`);
app.listen(port);