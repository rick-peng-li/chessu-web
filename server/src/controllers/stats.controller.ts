import type { PlatformStats } from "@chessu/types";
import type { Request, Response } from "express";

import GameModel, { activeGames } from "../db/models/game.model.js";
import UserModel from "../db/models/user.model.js";

export const getPlatformStats = async (req: Request, res: Response) => {
    try {
        const [totalUsers, winsBySide] = await Promise.all([
            UserModel.countAll(),
            GameModel.countByWinner()
        ]);

        const stats: PlatformStats = {
            users: totalUsers ?? 0,
            games: (winsBySide ? Object.values(winsBySide).reduce((a, b) => a + b, 0) : 0),
            activeGames: activeGames.length,
            whiteWins: winsBySide?.white ?? 0,
            blackWins: winsBySide?.black ?? 0,
            draws: winsBySide?.draw ?? 0
        };

        res.status(200).json(stats);
    } catch (err: unknown) {
        console.log(err);
        res.status(500).end();
    }
};
