import type { Metadata } from "next";

import PlayersPage from "@/pages/players/PlayersPage";

export const metadata: Metadata = {
  title: "Online players | chessu",
  description: "Players and spectators currently connected to live games"
};

export default function Players() {
  return <PlayersPage />;
}
