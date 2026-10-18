"use client";

import { IconRefresh } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import EmptyState from "@/components/common/EmptyState";
import Loading from "@/components/common/Loading";
import { fetchPublicGames } from "@/lib/game";
import type { Game } from "@chessu/types";

import JoinButton from "@/components/home/PublicGames/JoinButton";

// ongoing public games list with client-side search
export default function OngoingGames() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadGames = useCallback(async () => {
    setLoading(true);
    const data = await fetchPublicGames();
    setGames(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const filteredGames = useMemo(() => {
    if (!games) return [];
    const keyword = search.trim().toLowerCase();
    if (!keyword) return games;
    return games.filter(
      (g) =>
        g.code?.toLowerCase().includes(keyword) ||
        g.white?.name?.toLowerCase().includes(keyword) ||
        g.black?.name?.toLowerCase().includes(keyword)
    );
  }, [games, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          className="input input-bordered input-sm w-full max-w-xs"
          placeholder="Search by player or code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-square btn-sm btn-ghost"
          aria-label="Refresh games"
          onClick={loadGames}
        >
          <IconRefresh size={16} className={loading ? "animate-spin" : ""} />
        </button>
        <span className="text-base-content/60 text-sm">{filteredGames.length} games</span>
      </div>

      {loading ? (
        <Loading text="Loading games..." />
      ) : filteredGames.length === 0 ? (
        <EmptyState message="No ongoing public games found" />
      ) : (
        <div className="bg-base-200 overflow-x-auto rounded-xl">
          <table className="table-compact lg:table-normal table-zebra table rounded-none">
            <thead>
              <tr>
                <th>Code</th>
                <th>White</th>
                <th>Black</th>
                <th>Spectators</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.map((game) => (
                <tr key={game.code} className="group">
                  <td className="font-mono">{game.code}</td>
                  <td className={typeof game.white?.id === "number" ? "text-primary" : ""}>
                    {game.white?.name || "(open)"}
                  </td>
                  <td className={typeof game.black?.id === "number" ? "text-primary" : ""}>
                    {game.black?.name || "(open)"}
                  </td>
                  <td>{game.observers?.length || 0}</td>
                  <th>
                    <JoinButton code={game.code as string} />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
