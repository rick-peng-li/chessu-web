"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import EmptyState from "@/components/common/EmptyState";
import Loading from "@/components/common/Loading";
import { fetchFinishedGames } from "@/lib/game";
import { ROUTES } from "@/router/routes";
import type { Game } from "@chessu/types";
import { endReasonLabel, isRegisteredPlayer, playerName, winnerSide } from "@/utils/game";
import { formatDateTime } from "@/utils/format";

// finished games history with client-side search
export default function FinishedGames() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadGames = useCallback(async () => {
    setLoading(true);
    const data = await fetchFinishedGames(30);
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
          placeholder="Search by player name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="text-base-content/60 text-sm">{filteredGames.length} games</span>
      </div>

      {loading ? (
        <Loading text="Loading history..." />
      ) : filteredGames.length === 0 ? (
        <EmptyState message="No finished games yet" />
      ) : (
        <div className="bg-base-200 overflow-x-auto rounded-xl">
          <table className="table-compact lg:table-normal table rounded-none">
            <thead>
              <tr>
                <th>White</th>
                <th>Black</th>
                <th>Result</th>
                <th>Ended</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.map((game) => {
                const winner = winnerSide(game);
                return (
                  <tr key={game.id}>
                    <td className={winner === "white" ? "font-bold" : ""}>
                      <span className={isRegisteredPlayer(game, "white") ? "text-primary" : ""}>
                        {playerName(game, "white")}
                      </span>
                    </td>
                    <td className={winner === "black" ? "font-bold" : ""}>
                      <span className={isRegisteredPlayer(game, "black") ? "text-primary" : ""}>
                        {playerName(game, "black")}
                      </span>
                    </td>
                    <td>
                      {winner ? (
                        <span className="badge badge-success badge-sm">
                          {winner} won
                        </span>
                      ) : (
                        <span className="badge badge-neutral badge-sm">draw</span>
                      )}
                      <span className="text-base-content/60 ml-2 text-xs">
                        {endReasonLabel(game.endReason)}
                      </span>
                    </td>
                    <td className="text-base-content/60 text-xs">
                      {formatDateTime(game.endedAt)}
                    </td>
                    <th>
                      <Link
                        href={ROUTES.ARCHIVE(game.id as number)}
                        className="btn btn-ghost btn-xs"
                        target="_blank"
                      >
                        Review
                      </Link>
                    </th>
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
