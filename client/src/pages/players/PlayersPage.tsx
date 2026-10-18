import PageHeader from "@/components/common/PageHeader";
import OnlinePlayersGrid from "@/components/players/OnlinePlayersGrid";

// online players: users currently connected to active games
export default function PlayersPage() {
  return (
    <div className="flex w-full flex-col gap-6 py-8">
      <PageHeader
        title="Online players"
        subtitle="Players and spectators currently connected to live games"
      />
      <OnlinePlayersGrid />
    </div>
  );
}
