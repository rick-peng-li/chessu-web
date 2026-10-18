import type { Metadata } from "next";

import GamesPage from "@/pages/games/GamesPage";

export const metadata: Metadata = {
  title: "Games | chessu",
  description: "Browse ongoing and finished games on chessu"
};

export default function Games() {
  return <GamesPage />;
}
