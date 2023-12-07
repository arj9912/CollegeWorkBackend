import { Router } from "express";
import authRouter from "./authRoute.js";

const route = Router();

// Auth routes
route.use("/", authRouter);

export default route;
