import {validationResult}  from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import Jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET } from "../utils/constants.js";
const Register = async(req, res) => {
   const errors =validationResult(req);
   res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()));
    
   if(errors.isEmpty()){
      const{name,username,password,email}=req.body;
      const salt= await bcrypt.genSalt(10);
      const hashpassword= await bcrypt.hash(password,salt);
      const userExist = await User.findOne({$or :[{
         email:email
      },{username:username}]

      })
      if(userExist){
         return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTIY,"user or email already exists"));
      }

     try{
      const result = await User.create({
        name:name,
        email:email,
        password:hashpassword,
        username:username
      })
      
     const token=Jwt.sign({userId:result._id},JWT_TOKEN_SECRET);
     res.json(jsonGenerate(StatusCode.SUCCESS,"Resgistration successfull",{userId:result._id,token:token}));

     }catch (error){
       console.log(error);
      }
      
      
      
    }
    
  };
  
  export default Register;