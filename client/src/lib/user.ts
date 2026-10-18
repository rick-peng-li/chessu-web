import { API_URL } from "@/config";
import type { Game, OnlineUser, PlayerStats } from "@chessu/types";

// leaderboard: registered users ordered by wins
export const fetchLeaderboard = async (limit = 50): Promise<PlayerStats[] | undefined> => {
    try {
        const res = await fetch(`${API_URL}/v1/users?limit=${limit}`, { cache: "no-store" });
        if (res && res.status === 200) {
            const users: PlayerStats[] = await res.json();
            return users;
        }
    } catch (err) {
        console.error(err);
    }
};

// users currently connected to active games
export const fetchOnlineUsers = async (): Promise<OnlineUser[] | undefined> => {
    try {
        const res = await fetch(`${API_URL}/v1/users/online`, { cache: "no-store" });
        if (res && res.status === 200) {
            const users: OnlineUser[] = await res.json();
            return users;
        }
    } catch (err) {
        console.error(err);
    }
};

export const fetchProfileData = async (name: string) => {
    try {
        // TODO: handle caching more efficiently?
        const res = await fetch(`${API_URL}/v1/users/${name}`, {
            next: { revalidate: 10 }
        });

        if (res && res.status === 200) {
            const data: PlayerStats & { recentGames: Game[] } = await res.json();
            return data;
        }
    } catch (err) {
        console.error(err);
    }
};
