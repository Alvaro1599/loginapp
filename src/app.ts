import express, { Application, json, urlencoded } from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import "./database";
const app: Application = express();

//settings

app.set("PORT", 4000);
//middlwares
app.use(morgan("dev"));
app.use(json());
app.use(
  urlencoded({
    extended: false,
  })
);
//routes
app.use("/api/auth", authRoutes);
export default app;
