import express from "express";
import Register from "../controllers/RegisterController.js";
import { Registerschema } from "../validationSchema/Registerschema.js";

const apiRoute = express.Router();



apiRoute.post("/register",Registerschema, Register);

export default apiRoute;