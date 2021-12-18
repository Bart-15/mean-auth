const path = require('path');
const mongoose = require('mongoose');


require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const connectionURI = process.env.MONGODB_URI

// connect
mongoose.connect(connectionURI, {useNewUrlParser: true, useUnifiedTopology: true})