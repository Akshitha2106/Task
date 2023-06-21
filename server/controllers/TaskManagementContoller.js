import User from "../models/User.js";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import Tasks from "../models/Tasks.js";

export const GetTask =async (req,res) =>{
    try{
     const list =await User.findById(req.userId)
       .select("-password")
       .populate("tasks")
       .exec();

       return res.json(jsonGenerate(StatusCode.SUCCESS,"Tasks are",list))
    }catch(error){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTIY,"Error",error))
    }

}

export const  GetTaskId = async (req,res) =>{
    try{
        const task = await Tasks.findById(req.params.id).populate("title").exec();
        return res.json(jsonGenerate(StatusCode.SUCCESS,"Task is ",task));

    }
    catch (error){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTIY,"Error",error));
    }
}


export const RemoveTask = async (req,res) =>{
    // console.log(req.userId,req.params.id)
    try{
       const result = Tasks.findOneAndDelete({
        userId:req.userId,
        _id:req.params.id
       });
       console.log(result);
       if(result){
        const user = User.findOneAndUpdate({
            _id:req.userId,
        },
        {
            $pull:{tasks:req.params.id}
        });
        res.json(jsonGenerate(StatusCode.SUCCESS,"Deleted successfully",null));                                                                        
       }
    }
    catch(error){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTIY,"Error",error));
    }
} 

export const Updatetask = async (req, res) => {
    try {
      const task = await Tasks.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        {
          $set: {
            tag: true, 
          },
        }
      );
      if (task) {
        res.json(jsonGenerate(StatusCode.SUCCESS, "Updated successfully",task ));
      }
    } catch (error) {
      return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)); 
    }
  };
                                                                                                                                                                                                                                                                                                                                                                                