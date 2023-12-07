import { Router } from "express";
import * as userCtrl from "../controllers/userController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const route = Router();

route.get("/", protect, restrictTo("admin"), userCtrl.getUsers);

route.get("/:id", userCtrl.getUser);

export default route;
