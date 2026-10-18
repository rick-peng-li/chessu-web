// all application route paths, single source of truth for navigation
// plain module (no "use client") so it can be imported by both server and client components
export const ROUTES = {
    HOME: "/",
    GAMES: "/games",
    LEADERBOARD: "/leaderboard",
    PLAYERS: "/players",
    STATS: "/stats",
    HELP: "/help",
    ABOUT: "/about",
    LOGIN: "/login",
    REGISTER: "/register",
    SETTINGS: "/settings",
    USER: (name: string) => `/user/${name}`,
    ARCHIVE: (id: number | string) => `/archive/${id}`,
    GAME: (code: string) => `/${code}`
} as const;

export interface NavItem {
    label: string;
    href: string;
}

// primary navigation entries shown in the header
export const PRIMARY_NAV: NavItem[] = [
    { label: "Games", href: ROUTES.GAMES },
    { label: "Leaderboard", href: ROUTES.LEADERBOARD }
];

// secondary navigation entries grouped under the header dropdown
export const MORE_NAV: NavItem[] = [
    { label: "Online players", href: ROUTES.PLAYERS },
    { label: "Platform stats", href: ROUTES.STATS },
    { label: "Help center", href: ROUTES.HELP },
    { label: "About", href: ROUTES.ABOUT }
];
