import GameAuthWrapper from "@/components/game/GameAuthWrapper";
import { fetchActiveGame } from "@/lib/game";
import { notFound } from "next/navigation";

// live game route: fetches the active game and renders the game client
export default async function GameRoute({ code }: { code: string }) {
  const game = await fetchActiveGame(code);
  if (!game) {
    notFound();
  }

  return <GameAuthWrapper initialLobby={game} />;
}
