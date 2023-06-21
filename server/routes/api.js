import express from "express";
import {check} from "express-validator";
import Register from "../controllers/RegisterController.js";
import { Registerschema } from "../validationSchema/Registerschema.js";
import Login from "../controllers/LoginController.js";
import {Loginschema} from "../validationSchema/Loginschema.js";
import { createTask } from "../controllers/TaskController.js";
import { GetTask, GetTaskId, RemoveTask, Updatetask } from "../controllers/TaskManagementContoller.js";
const apiRoute = express.Router();

export const apiProtected=express.Router();

apiRoute.post("/register",Registerschema, Register);
apiRoute.post("/login",Loginschema, Login);

apiProtected.post("/createtask",
[check("desc","Task desc is required").exists(),
check("title","Task title is required").exists(),
]
,createTask);

apiProtected.get("/GetTask"
,GetTask);
apiProtected.get("/GetTaskId/:id"
,GetTaskId);
apiProtected.delete("/Removetask/:id"
,RemoveTask);

apiProtected.put("/Updatetask/:id"
,Updatetask);

export default apiRoute;