import type { Game } from "@chessu/types";

// total finished games from win/loss/draw counts
export const calcTotalGames = (wins?: number, losses?: number, draws?: number): number =>
    (wins ?? 0) + (losses ?? 0) + (draws ?? 0);

// win rate as a percentage string, e.g. "67%"
export const calcWinRate = (wins?: number, losses?: number, draws?: number): string => {
    const total = calcTotalGames(wins, losses, draws);
    if (!total) return "0%";
    return `${Math.round(((wins ?? 0) / total) * 100)}%`;
};

// human readable label for a game end reason
export const endReasonLabel = (reason?: string | null): string => {
    if (reason === "repetition") return "threefold repetition";
    if (reason === "insufficient") return "insufficient material";
    return reason || "";
};

// name of the player on the given side, empty string when seat is empty
export const playerName = (game: Game, side: "white" | "black"): string =>
    game[side]?.name || "";

// whether the given side seat is taken by a registered (non-guest) user
export const isRegisteredPlayer = (game: Game, side: "white" | "black"): boolean =>
    typeof game[side]?.id === "number";

// side that won the game, null for draws or unfinished games
export const winnerSide = (game: Game): "white" | "black" | null =>
    game.winner === "white" || game.winner === "black" ? game.winner : null;
