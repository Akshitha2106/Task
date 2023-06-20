import express from "express";
import apiRoute from "../routes/api.js";
import mongoose from "mongoose";
import { DB_CONNECT } from "../utils/constants.js";
const app = express();


mongoose
  .connect(DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db successfully");
  })
  .catch((err) => {
    console.log("errorrrrrrrrrrrrr");
    console.log(err);
  });

const PORT = 8000;
app.use(express.json());
app.use("/api/", apiRoute);

app.listen(PORT, () => {
  console.log("Server listening on port 8000");
});