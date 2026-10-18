"use client";

import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import EmptyState from "@/components/common/EmptyState";
import Loading from "@/components/common/Loading";
import { fetchOnlineUsers } from "@/lib/user";
import { ROUTES } from "@/router/routes";
import type { OnlineUser } from "@chessu/types";

const ROLE_LABEL: Record<OnlineUser["role"], string> = {
  white: "Playing white",
  black: "Playing black",
  observer: "Spectating"
};

const ROLE_BADGE: Record<OnlineUser["role"], string> = {
  white: "badge-info",
  black: "badge-secondary",
  observer: "badge-ghost"
};

// grid of users currently connected to active games
export default function OnlinePlayersGrid() {
  const [users, setUsers] = useState<OnlineUser[] | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const data = await fetchOnlineUsers();
    setUsers(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const inGameCount = useMemo(
    () => users?.filter((u) => u.role !== "observer").length ?? 0,
    [users]
  );

  if (loading) {
    return <Loading text="Scanning active games..." />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <button className="btn btn-sm btn-ghost" onClick={loadUsers}>
          Refresh
        </button>
        <span className="text-base-content/60 text-sm">
          {users?.length ?? 0} online, {inGameCount} playing
        </span>
      </div>

      {!users || users.length === 0 ? (
        <EmptyState message="Nobody is online right now — start a game from the home page" />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => (
            <div key={`${user.id}-${index}`} className="bg-base-200 flex flex-col gap-2 rounded-xl p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-success" />
                  {typeof user.id === "number" ? (
                    <a
                      href={ROUTES.USER(user.name as string)}
                      className="link-hover font-bold"
                      target="_blank"
                    >
                      {user.name}
                    </a>
                  ) : (
                    <span className="font-bold">{user.name}</span>
                  )}
                </div>
                <span className={"badge badge-sm " + ROLE_BADGE[user.role]}>
                  {ROLE_LABEL[user.role]}
                </span>
              </div>
              {user.gameCode && (
                <Link
                  href={ROUTES.GAME(user.gameCode)}
                  className="btn btn-outline btn-sm gap-1 self-start"
                >
                  <IconEye size={16} />
                  Watch game
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
