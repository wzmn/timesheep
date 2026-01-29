import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true  
    },
    hours: {
        type: Number,
        required: true,
    },
    week: {
        type: String,
        required: true
    },
    type_of_work: {
        type: String,
        required: true
    }
});


const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;