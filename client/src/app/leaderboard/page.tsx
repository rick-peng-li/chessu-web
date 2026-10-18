import type { Metadata } from "next";

import LeaderboardPage from "@/pages/leaderboard/LeaderboardPage";

export const metadata: Metadata = {
  title: "Leaderboard | chessu",
  description: "Registered players ranked by wins and win rate"
};

export default function Leaderboard() {
  return <LeaderboardPage />;
}
