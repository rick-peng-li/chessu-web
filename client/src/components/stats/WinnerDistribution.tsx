import type { PlatformStats } from "@chessu/types";

// winner distribution bars for the platform stats page
export default function WinnerDistribution({ stats }: { stats: PlatformStats }) {
  const total = stats.whiteWins + stats.blackWins + stats.draws;
  const rows = [
    { label: "White wins", value: stats.whiteWins, color: "bg-base-content" },
    { label: "Black wins", value: stats.blackWins, color: "bg-secondary" },
    { label: "Draws", value: stats.draws, color: "bg-accent" }
  ];

  return (
    <div className="bg-base-200 flex flex-col gap-4 rounded-xl p-6">
      <h2 className="text-xl font-bold">Outcome distribution</h2>
      {total === 0 ? (
        <p className="text-base-content/60">No finished games yet.</p>
      ) : (
        rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1">
            <div className="flex justify-between text-sm">
              <span>{row.label}</span>
              <span className="font-bold">
                {row.value} ({Math.round((row.value / total) * 100)}%)
              </span>
            </div>
            <progress
              className={`progress ${row.color} h-3 w-full`}
              value={row.value}
              max={total}
            />
          </div>
        ))
      )}
    </div>
  );
}
