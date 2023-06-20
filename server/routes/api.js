import express from "express";
import Register from "../controllers/RegisterController.js";
import { Registerschema } from "../validationSchema/Registerschema.js";
import Login from "../controllers/LoginController.js";
import {Loginschema} from "../validationSchema/Loginschema.js";
import { createTask } from "../controllers/TaskController.js";
const apiRoute = express.Router();


apiRoute.post("/register",Registerschema, Register);
apiRoute.post("/login",Loginschema, Login);
export const apiProtected=express.Router();

apiProtected.post("/createtask",createTask)

export default apiRoute;