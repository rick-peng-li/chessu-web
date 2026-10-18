import { API_URL } from "@/config";
import type { PlatformStats } from "@chessu/types";

export const fetchPlatformStats = async (): Promise<PlatformStats | undefined> => {
    try {
        const res = await fetch(`${API_URL}/v1/stats`, { cache: "no-store" });
        if (res && res.status === 200) {
            const stats: PlatformStats = await res.json();
            return stats;
        }
    } catch (err) {
        console.error(err);
    }
};
