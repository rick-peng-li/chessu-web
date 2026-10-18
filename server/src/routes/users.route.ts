import { Router } from "express";
import * as controller from "../controllers/users.controller.js";

const router = Router();

// static routes must be registered before "/:name"
router.route("/").get(controller.listUsers);
router.route("/online").get(controller.getOnlineUsers);
router.route("/:name").get(controller.getUserProfile);

export default router;
