import PageHeader from "@/components/common/PageHeader";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";

// leaderboard: registered players ranked by performance
export default function LeaderboardPage() {
  return (
    <div className="flex w-full flex-col gap-6 py-8">
      <PageHeader
        title="Leaderboard"
        subtitle="Registered players ranked by wins, with win rate breakdowns"
      />
      <LeaderboardTable />
    </div>
  );
}
