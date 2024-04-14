import mongoose, { Schema , Mongoose } from "mongoose";
import { nanoid } from "nanoid";

const todoSchema = new mongoose.Schema ({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    detail : {
        type : String,
        required : true,
        trim : true,
    },
    status : {
        type : String,
        required : true,
        enum : ['Completed ','Pending'],
        default : 'Pending',
        trim : true
    },
    code : {
        type : String,
        required : true,
        default : 'code',
        trim : true,
    }

} , {
    timestamps:true 
})

todoSchema.pre('save' , function(next){
    this.code = nanoid(10)
    next()
})

const todos = mongoose.model('todos' , todoSchema)
export default todos