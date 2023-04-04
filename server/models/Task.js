const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    sNo: {
        type: Number,
        required: true,
        unique: true
    },
    taskName: {
        type: String,
        required: true
    },
    taskDesc: {
        type: String,
        required: false
    }
});

const task = mongoose.model('task', taskSchema)
module.exports = task