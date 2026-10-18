import type { OnlineUser } from "@chessu/types";
import type { Request, Response } from "express";
import xss from "xss";

import { activeGames } from "../db/models/game.model.js";
import GameModel from "../db/models/game.model.js";
import UserModel from "../db/models/user.model.js";

export const listUsers = async (req: Request, res: Response) => {
    try {
        const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
        const users = await UserModel.findAll(limit);
        if (!users) {
            res.status(500).end();
            return;
        }
        res.status(200).json(users);
    } catch (err: unknown) {
        console.log(err);
        res.status(500).end();
    }
};

export const getOnlineUsers = async (req: Request, res: Response) => {
    try {
        const online: OnlineUser[] = [];
        for (const game of activeGames) {
            if (game.white?.connected) {
                online.push({
                    id: game.white.id,
                    name: game.white.name,
                    role: "white",
                    gameCode: game.code
                });
            }
            if (game.black?.connected) {
                online.push({
                    id: game.black.id,
                    name: game.black.name,
                    role: "black",
                    gameCode: game.code
                });
            }
            for (const observer of game.observers ?? []) {
                online.push({
                    id: observer.id,
                    name: observer.name,
                    role: "observer",
                    gameCode: game.code
                });
            }
        }
        res.status(200).json(online);
    } catch (err: unknown) {
        console.log(err);
        res.status(500).end();
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const name = xss(req.params.name);

        const users = await UserModel.findByNameEmail({ name, email: name });

        if (!users || !users.length) {
            res.status(404).end();
            return;
        }

        const recentGames = await GameModel.findByUserId(users[0].id as number);

        const publicUser = {
            id: users[0].id,
            name: users[0].name,
            wins: users[0].wins,
            losses: users[0].losses,
            draws: users[0].draws
        };

        res.status(200).json({ ...publicUser, recentGames });
    } catch (err: unknown) {
        console.log(err);
        res.status(500).end();
    }
};
