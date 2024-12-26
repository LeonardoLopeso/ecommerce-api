import express from "express";
import { initializeApp } from "firebase-admin/app";
import { routes } from "./routes/index";

initializeApp();
const app = express();

routes(app);

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3000");
});