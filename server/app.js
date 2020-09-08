const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {MONGOURI} = require('./keys') 

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo')
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
})

require('./models/user')
require('./models/project')

app.use(express.json())
app.use(require('./routes/send'))
app.use(require('./routes/auth'))
app.use(require('./routes/project'))


const port = 4000;
app.listen(port,()=>{
    console.log(`Server Running`)
})
