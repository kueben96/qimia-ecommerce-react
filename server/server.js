const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
//middle prevents people from breaking the server
const xss = require('xss-clean');
const mongoSanitize  = require('express-mongo-sanitize');
const routes = require('./routes')
const passport = require('passport');
const {jwtStrategy} = require('./middleware/passport')
const {handleError, convertToApiError } = require('./middleware/apiError')
//mongodb+srv://admin:<password>@cluster0.sadmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
})

//body parse
app.use(express.json())
// middleware sanitize
app.use(xss())
app.use(mongoSanitize());

//passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);


//routes

app.use('/api', routes)

// if the error is not recognized ... convert to apiError
app.use(convertToApiError);
// handle errors with api
app.use((err,req,res,next)=>{
    handleError(err,res)
})

// starts the server
const port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})