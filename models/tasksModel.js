const mongoose = require('mongoose') 

const taskSchema = new mongoose.Schema({
    
    title:String
})

module.exports =  new mongoose.model('task',taskSchema)