const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const taskModel = require('./models/task')
const { MongoClient, ServerApiVersion } = require('mongodb');
const { findOneAndRemove } = require('./models/task');


app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://sampleuser:strongpassword@crud.fot7618.mongodb.net/CRUD?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1})
.then(() => {
    console.log("MongoDb Connected");
})
.catch(err => console.log('Mongo Error', err));

app.post('/insert', async (req,res) => {

    const count_tasks = await taskModel.estimatedDocumentCount();
    var sno = count_tasks + 1;
    const taskName = req.body.taskName;
    const taskDesc = req.body.taskDesc;

    const task = new taskModel({
        sNo: sno,
        taskName: taskName,
        taskDesc: taskDesc,
    });

    try {
        await task.save();
        res.send("Inserted Data")
    }
    catch(err) {
        console.log(err)
    }
})

app.post('/find', async (req, res) => {
    taskModel.find({sNo: req.body.idval})
    .then((task) => {
        res.send(task)
    })
    .catch((err) => {
        res.send(err)
    })
})

app.get('/read', async(req,res) => {
    taskModel.find({})
    .then((task) => {
        res.send(task)
    })
    .catch((err) => {
        res.send(err)
    })
})

app.put('/update', async (req, res) => {
    const newtaskName = req.body.taskName;
    const newtaskDesc = req.body.taskDesc;

    try {
        await taskModel.findOne({sNo: req.body.idval})
        .then(updatedtask => {
                updatedtask.sNo = req.body.idval;
                updatedtask.taskName = newtaskName;
                updatedtask.taskDesc = newtaskDesc;
                updatedtask.save();
            })
    }
    catch(err) {
        console.log(err)
    }
})

app.delete('/delete/:id', async (req, res) => {
    const sNo = req.params.id;
    taskModel.findOneAndRemove(sNo).exec();
})

app.delete('/deleteall', async (req, res) => {
    taskModel.deleteMany({}).exec();
})

app.listen(3001, ()=> {
    console.log("Server is Running. Port: 3001")
})