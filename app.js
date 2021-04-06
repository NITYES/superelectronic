const express=require('express');
const bodyparser=require('body-parser');
const dotenv=require('dotenv').config();
const ejs=require('ejs');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const path=require('path')


//import routes
const indexRouter=require('./routes/index')

//cretae app
const app=express()

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//database connection
let MONGODB_URL =
  process.env.NODE_ENV === "PRODUCTION"
    ? `mongodb+srv://wiseowl:${process.env.MONGO_DB_PASSWORD}@customerinformation.x9ecw.mongodb.net/SUPERELECTRONIC?retryWrites=true&w=majority`
    : "mongodb://localhost:27017/superelectronic";
try {
    mongoose.connect(
      MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: true,
      },   
      (error) => {
        if (error) console.log(error);
        console.log("connected to the database");
      }
    );
  } catch (error) {
    console.log(error);
  }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//serve static files
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use('/',indexRouter)

//error handler
app.use((error,req,res,next)=>{
console.log(error.message);


})
const  PORT=process.env.PORT||4000
app.listen(PORT,()=>{
    console.log(`server started running at port 4000`)
})