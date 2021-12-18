const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')
const passport = require('passport');


 const PORT = process.env.PORT 
// .env
require('dotenv').config({ path: './.env' })
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(cors());
app.use(userRouter)


// run
app.listen(PORT, ()=> {
    console.log('Listening on port '+PORT);
})





