import mongoose from "mongoose";


const taskSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    tag:{
        type:Boolean,
        default:false,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },

});
export default mongoose.model("Task",taskSchema);