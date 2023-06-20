import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import Tasks from "../models/Tasks.js";

export const createTask = async(req,res) =>{
   const error=validationResult(req);
   if(!error.isEmpty()){
       return res.json(jsonGenerate
          (StatusCode.VALIDATION_ERROR,
             "Todo is required",
             error.mapped()
          )
        );
   }
   try{
    const result = await Tasks.create({
        userId:req.userId,
        desc:req.body.desc,

    })
    if(result){
        const user=await User.findOneAndUpdate({_id:req.userId},
            {
               $push:{taks:result}
            });
            return res.json(jsonGenerate(StatusCode.SUCCESS,"Task created successfully",result));
    }
   }
   catch(err){
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTIY,"Something went wrong",error));
   }
};