const express = require('express');
const app = new express();



const port = 3000;


/* - - - Routes - - - */
const debug = require('./routes/debug');
app.use(debug);


const members = require('./routes/members');
app.use(members);


console.log(`Listening on Port '${port}'`);
app.listen(port);