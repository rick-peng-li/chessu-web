export interface Game {
    id?: number;
    pgn?: string;
    white?: User;
    black?: User;
    winner?: "white" | "black" | "draw";
    endReason?: "draw" | "checkmate" | "stalemate" | "repetition" | "insufficient" | "abandoned";
    host?: User;
    code?: string;
    unlisted?: boolean;
    timeout?: number;
    observers?: User[];
    startedAt?: number;
    endedAt?: number;
}

export interface User {
    id?: number | string; // string for guest IDs
    name?: string | null;
    email?: string;
    wins?: number;
    losses?: number;
    draws?: number;

    // mainly for players, not spectators
    connected?: boolean;
    disconnectedOn?: number;
}

// user with computed game count, used by the leaderboard
export interface PlayerStats extends User {
    games?: number;
}

// aggregated platform statistics
export interface PlatformStats {
    users: number;
    games: number;
    activeGames: number;
    whiteWins: number;
    blackWins: number;
    draws: number;
}

// user currently connected to an active game
export interface OnlineUser {
    id?: number | string;
    name?: string | null;
    role: "white" | "black" | "observer";
    gameCode?: string;
}
