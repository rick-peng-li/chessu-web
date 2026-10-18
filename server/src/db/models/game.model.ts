import type { Game, User } from "@chessu/types";
import { db } from "../index.js";

export const activeGames: Game[] = [];

// shared SELECT column list for archived games (joined with user table for names)
const ARCHIVED_GAME_COLUMNS = /* sql */ `
    game.id, game.winner, game.end_reason, game.pgn,
    white_user.id AS white_id, COALESCE(white_user.name, game.white_name) AS white_name,
    black_user.id AS black_id, game.started_at, game.ended_at,
    COALESCE(black_user.name, game.black_name) AS black_name
`;

const toGame = (r: Record<string, unknown>): Game =>
    ({
        id: r.id,
        winner: r.winner,
        endReason: r.end_reason,
        pgn: r.pgn,
        white: { id: r.white_id || undefined, name: r.white_name },
        black: { id: r.black_id || undefined, name: r.black_name },
        startedAt: (r.started_at as Date).getTime(),
        endedAt: (r.ended_at as Date | null)?.getTime() || undefined
    }) as Game;

export const save = async (game: Game) => {
    try {
        const white: User = {};
        const black: User = {};
        if (typeof game.white?.id === "string") {
            white.name = game.white?.name;
        } else {
            white.id = game.white?.id;
        }
        if (typeof game.black?.id === "string") {
            black.name = game.black?.name;
        } else {
            black.id = game.black?.id;
        }
        const res = await db.query(
            `INSERT INTO "game"(winner, end_reason, pgn, white_id, white_name, black_id, black_name, started_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                game.winner || null,
                game.endReason || null,
                game.pgn,
                white.id || null,
                white.name || null,
                black.id || null,
                black.name || null,
                new Date(game.startedAt as number)
            ]
        );
        if (black.id || white.id) {
            // draws
            if (game.winner === "draw") {
                if (white.id) {
                    await db.query(`UPDATE "user" SET draws = draws + 1 WHERE id = $1`, [white.id]);
                }
                if (black.id) {
                    await db.query(`UPDATE "user" SET draws = draws + 1 WHERE id = $1`, [black.id]);
                }
            } else {
                const winner = game.winner === "white" ? white : black;
                const loser = game.winner === "white" ? black : white;
                if (winner.id) {
                    await db.query(`UPDATE "user" SET wins = wins + 1 WHERE id = $1`, [winner.id]);
                }
                if (loser.id) {
                    await db.query(`UPDATE "user" SET losses = losses + 1 WHERE id = $1`, [
                        loser.id
                    ]);
                }
            }
        }
        return {
            id: res.rows[0].id,
            winner: res.rows[0].winner,
            endReason: res.rows[0].reason,
            pgn: res.rows[0].pgn,
            white: {
                id: res.rows[0].white_id || undefined,
                name: res.rows[0].white_name || undefined
            },
            black: {
                id: res.rows[0].black_id || undefined,
                name: res.rows[0].black_name || undefined
            },
            startedAt: res.rows[0].started_at.getTime(),
            endedAt: res.rows[0].ended_at?.getTime() || undefined
        } as Game;
    } catch (err: unknown) {
        console.log(err);
        return null;
    }
};

export const findById = async (id: number) => {
    try {
        const res = await db.query(
            `SELECT ${ARCHIVED_GAME_COLUMNS} FROM game
             LEFT JOIN "user" white_user ON white_user.id = game.white_id
             LEFT JOIN "user" black_user ON black_user.id = game.black_id
             WHERE game.id=$1`,
            [id]
        );
        if (res.rowCount) {
            return toGame(res.rows[0]);
        } else return null;
    } catch (err: unknown) {
        console.log(err);
        return null;
    }
};

export const findRecent = async (limit = 20): Promise<Game[] | null> => {
    try {
        const res = await db.query(
            `SELECT ${ARCHIVED_GAME_COLUMNS} FROM game
             LEFT JOIN "user" white_user ON white_user.id = game.white_id
             LEFT JOIN "user" black_user ON black_user.id = game.black_id
             ORDER BY game.id DESC
             LIMIT $1`,
            [limit]
        );
        return res.rows.map(toGame);
    } catch (err: unknown) {
        console.log(err);
        return null;
    }
};

export const countByWinner = async (): Promise<Record<string, number> | null> => {
    try {
        const res = await db.query(`SELECT winner, COUNT(*) AS count FROM "game" GROUP BY winner`);
        return res.rows.reduce(
            (acc: Record<string, number>, row: Record<string, unknown>) => {
                if (row.winner) acc[row.winner as string] = parseInt(row.count as string);
                return acc;
            },
            {} as Record<string, number>
        );
    } catch (err: unknown) {
        console.log(err);
        return null;
    }
};

export const findByUserId = async (id: number, limit = 10) => {
    if (id == 0) {
        return null;
    }
    try {
        // TODO: pagination
        const res = await db.query(
            `SELECT ${ARCHIVED_GAME_COLUMNS} FROM game
             LEFT JOIN "user" white_user ON white_user.id = game.white_id
             LEFT JOIN "user" black_user ON black_user.id = game.black_id
             WHERE white_user.id=$1 OR black_user.id=$1
             ORDER BY game.id DESC
             LIMIT $2`,
            [id, limit]
        );
        return res.rows.map(toGame);
    } catch (err: unknown) {
        console.log(err);
        return null;
    }
};

export const remove = async (id: number) => {
    try {
        const res = await db.query(`DELETE FROM "game" WHERE id = $1 RETURNING *`, [id]);
        return {
            id: res.rows[0].id,
            winner: res.rows[0].winner,
            endReason: res.rows[0].end_reason,
            pgn: res.rows[0].pgn,
            white: { id: res.rows[0].white_id, name: res.rows[0].white_name },
            black: { id: res.rows[0].black_id, name: res.rows[0].black_name },
            startedAt: res.rows[0].started_at.getTime(),
            endedAt: res.rows[0].ended_at?.getTime() || undefined
        } as Game;
    } catch (err: unknown) {
        console.log(err);
        return null;
    }
};

const GameModel = {
    save,
    findById,
    findRecent,
    countByWinner,
    findByUserId,
    remove
};

export default GameModel;
