import type { Metadata } from "next";

import GameRoute from "@/pages/game/GameRoute";
import { fetchActiveGame } from "@/lib/game";

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  const game = await fetchActiveGame(params.code);
  if (!game) {
    return {
      title: "Game not found | chessu",
      robots: {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true
      }
    };
  }
  return {
    title: "chessu",
    description: `Play or watch a game with ${game.host?.name}`,
    openGraph: {
      title: "chessu",
      description: `Play or watch a game with ${game.host?.name}`,
      url: `https://ches.su/${game.code}`,
      siteName: "chessu",
      locale: "en_US",
      type: "website"
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      noarchive: true
    }
  };
}

export default async function Game({ params }: { params: { code: string } }) {
  return <GameRoute code={params.code} />;
}
