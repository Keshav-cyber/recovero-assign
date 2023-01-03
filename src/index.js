const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/route.js')
const cors = require('cors')
const winston = require('winston')

const app = express()
app.use(express.json())
app.use(cors())


// all logs in a log file
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    
    transports: [
      new winston.transports.File({
        filename: 'combined.log',
      }),
      new winston.transports.File({
        filename: 'app-error.log',
        level: 'error',
      }),
    ],
  });
logger.info('Info message');
logger.error('Error message');
logger.warn('Warning message');

//database connection
mongoose.connect("mongodb+srv://Keshav-cyber:7LizqrsG6tL39fuT@cluster0.ohm0bak.mongodb.net/recoveroApp?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)



app.listen(process.env.PORT || 5000 , function(){
    console.log('Express app running on port ' + (process.env.PORT || 5000))
})