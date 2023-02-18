import {Schema, model} from 'mongoose'

const taskModel = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    userId: {type: String, required: true},
    timestamp: {type: Date, default: Date.now()}
})

export default model('Task', taskModel)