import express from "express";
import "dotenv/config";
import cors from "cors";
import { createUser } from "./Handler/createUserHandler.js";
import { createConvention } from "./Handler/createConventionHandler.js";
import { attendConvention } from "./Handler/attendConventionHandler.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/create/user", (req, res) => {
  createUser(req, res);
});

app.post("/create/convention", (req, res) => {
  createConvention(req, res);
});

app.post("/event/:id/attend", (req, res) => {
  attendConvention(req, res);
});

app.get("/test", (req, res) => {
  console.log(req.body);
  res.send({ hello: "test" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
