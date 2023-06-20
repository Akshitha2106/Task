import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import User from "../models/User.js";
import  {JWT_TOKEN_SECRET} from "../utils/constants.js";

const Login = async(req,res) =>{
  const errors = validationResult(req);
  if(errors.isEmpty()){
    const {username,password}=req.body;
    const user=await User.findOne({username:username});

    if(!user){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTIY,"Username or password is incorrect"));
    }
    const verify = bcrypt.compareSync(password,user.password);
  if(!verify){
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTIY,"Username or password is incorrect"));
  }
  const token=Jwt.sign({userId:user._id},JWT_TOKEN_SECRET);
  return res.json(jsonGenerate(StatusCode.SUCCESS,"Loin successful",{userId:user._id,token}));
  }
  res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()))
}
export default Login;