import mongoose from "mongoose";

const taskSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    isCompleted:{type:Boolean,default:false},
},{timeStamp:true})
export default mongoose.model('tasks',taskSchema) 