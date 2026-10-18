"use client";

import { useEffect, useMemo, useState } from "react";

import EmptyState from "@/components/common/EmptyState";
import Loading from "@/components/common/Loading";
import { fetchLeaderboard } from "@/lib/user";
import { ROUTES } from "@/router/routes";
import type { PlayerStats } from "@chessu/types";
import { calcTotalGames, calcWinRate } from "@/utils/game";

type SortKey = "wins" | "games" | "winRate";

// leaderboard table with search and sorting
export default function LeaderboardTable() {
  const [users, setUsers] = useState<PlayerStats[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("wins");

  useEffect(() => {
    (async () => {
      const data = await fetchLeaderboard(50);
      setUsers(data || []);
      setLoading(false);
    })();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const keyword = search.trim().toLowerCase();
    const list = keyword
      ? users.filter((u) => u.name?.toLowerCase().includes(keyword))
      : [...users];
    if (sortKey === "winRate") {
      list.sort(
        (a, b) =>
          parseInt(calcWinRate(b.wins, b.losses, b.draws)) -
          parseInt(calcWinRate(a.wins, a.losses, a.draws))
      );
    } else if (sortKey === "games") {
      list.sort(
        (a, b) => calcTotalGames(b.wins, b.losses, b.draws) - calcTotalGames(a.wins, a.losses, a.draws)
      );
    }
    // default server order (wins desc) is preserved otherwise
    return list;
  }, [users, search, sortKey]);

  if (loading) {
    return <Loading text="Loading leaderboard..." />;
  }

  if (!users || users.length === 0) {
    return <EmptyState message="No registered players yet" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          className="input input-bordered input-sm w-full max-w-xs"
          placeholder="Search by username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered select-sm"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          aria-label="Sort leaderboard"
        >
          <option value="wins">Sort by wins</option>
          <option value="games">Sort by games</option>
          <option value="winRate">Sort by win rate</option>
        </select>
        <span className="text-base-content/60 text-sm">{filteredUsers.length} players</span>
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState message="No players match your search" />
      ) : (
        <div className="bg-base-200 overflow-x-auto rounded-xl">
          <table className="table-compact lg:table-normal table-zebra table rounded-none">
            <thead>
              <tr>
                <th className="w-16">Rank</th>
                <th>Player</th>
                <th>Games</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Draws</th>
                <th>Win rate</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => {
                const rankBadge =
                  index === 0
                    ? "badge-warning"
                    : index === 1
                      ? "badge-neutral"
                      : index === 2
                        ? "badge-primary"
                        : "";
                return (
                  <tr key={user.id} className="group">
                    <td>
                      <span className={"badge badge-sm " + rankBadge}>{index + 1}</span>
                    </td>
                    <td>
                      <a href={ROUTES.USER(user.name as string)} className="link-hover font-bold">
                        {user.name}
                      </a>
                    </td>
                    <td>{calcTotalGames(user.wins, user.losses, user.draws)}</td>
                    <td className="text-success font-bold">{user.wins}</td>
                    <td className="text-error">{user.losses}</td>
                    <td>{user.draws}</td>
                    <td>{calcWinRate(user.wins, user.losses, user.draws)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
