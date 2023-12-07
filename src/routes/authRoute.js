import { Router } from "express";
import * as authCtrl from "../controllers/authController.js";
import { getUser } from "../controllers/userController.js";

const route = Router();

route.post("/register", authCtrl.register);

route.post("/login", authCtrl.login);

route.get("/me", authCtrl.protect, authCtrl.getMe, getUser);

export default route;
