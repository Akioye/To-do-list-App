const exphbs = require("express-handlebars");


const express = require('express')

const app = express()

const Task = require('./models/tasksModel')

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/todolist',()=>{ // this is used to connect the db
  console.log('connected to mongodb')
})



// Create A Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

app.set("view engine", ".hbs");

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);


app.get('/', async (req,res)=>{

    const allTasks = await Task.find()

    res.render("home",{allTasks})
})

app.post('/add-task',async(req,res)=>{
   await Task.create(req.body)
//    await Task.create({}
  // title : req.body.title
//     })
        res.redirect('/')
  
    })

app.post('/delete-task',async(req,res)=>{
    await Task.deleteOne({
        checkbox : req.body.checkbox
    })
     res.redirect('/')
    // const checkBody = req.body.checkbox

//     const checkBody = req.body.checkbox
//     console.log(checkBody)

//     const finder = jsdata.find(({title})=> title === checkBody)
//     console.log(finder)
//     jsdata.shift(finder)
//     res.redirect('/')
})

app.listen(1200,function(){  
    console.log('Our port is online')
})