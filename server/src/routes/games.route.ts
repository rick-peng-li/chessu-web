import { Router } from "express";

import * as controller from "../controllers/games.controller.js";

const router = Router();

router.route("/").get(controller.getGames).post(controller.createGame);

// static routes must be registered before "/:code"
router.route("/history").get(controller.getGameHistory);

router.route("/:code").get(controller.getActiveGame);

export default router;
