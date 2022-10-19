const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 5000;
const path = ('path');
var static = ('serve-static');
const dotenv = require('dotenv');
dotenv.config()
const CONSTANT = require('../backend/common/constant');

//Import Routing Files
const User = require("./routes/user.router")
const Feedback = require("./routes/feedback.router")
const Exam = require("./routes/exam.router")
const Skill = require('./routes/skill.route');
const Question = require("./routes/question.route")
const ExamResult = require("./routes/examResult.route")



var server = http.createServer(app)

app.use(express.static('public'))

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json({extended: true}))
app.use(cors())


app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(function(req,res,next){
    res.header("Access-Control-Allow-origin","*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers, Origin, X-Requested-with, Accept, Authorization")
    if('OPTIONS' ==req.method){
        res.sendStatus(200);
    }else{
        next();
    }
})




const database = require('./common/db');
mongoose.Promise = global.Promise;



mongoose.connect(database.DB, {
    useNewUrlParser: true,
}).then(() =>{
    console.log("Successfully connected to the database")
}).catch(err =>{
    console.log('could not connect to the database. Exiting now...', err);
    process.exit();
})
app.use("/user",User)
app.use("/feedback",Feedback)
app.use("/exam",Exam)
app.use("/skills", Skill)
app.use("/question", Question)
app.use("/examresult", ExamResult)




server.listen(PORT, '0.0.0.0', function(){
    if(!fs.existsSync(CONSTANT.DIR)){
        fs.mkdirSync(CONSTANT.DIR, {
            recursive: true
        });
    }
    console.log("Express http server listing on *:", PORT)
})