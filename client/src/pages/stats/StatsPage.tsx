"use client";

import { IconActivity, IconChess, IconScale, IconUsers } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import WinnerDistribution from "@/components/stats/WinnerDistribution";
import { fetchPlatformStats } from "@/lib/stats";
import type { PlatformStats } from "@chessu/types";

// platform-wide statistics dashboard
export default function StatsPage() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = useCallback(async () => {
    setLoading(true);
    const data = await fetchPlatformStats();
    setStats(data || null);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <div className="flex w-full flex-col gap-6 py-8">
      <PageHeader
        title="Platform stats"
        subtitle="Aggregated numbers across the chessu platform"
        action={
          <button className="btn btn-sm btn-ghost" onClick={loadStats}>
            Refresh
          </button>
        }
      />

      {loading || !stats ? (
        <Loading text="Crunching numbers..." />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Registered players"
              value={stats.users}
              icon={<IconUsers size={28} />}
              desc="accounts created"
            />
            <StatCard
              title="Games played"
              value={stats.games}
              icon={<IconChess size={28} />}
              desc="finished games archived"
            />
            <StatCard
              title="Active games"
              value={stats.activeGames}
              icon={<IconActivity size={28} />}
              desc="lobbies in memory"
            />
            <StatCard
              title="Draws"
              value={stats.draws}
              icon={<IconScale size={28} />}
              desc="games ending in a draw"
            />
          </div>

          <WinnerDistribution stats={stats} />
        </>
      )}
    </div>
  );
}
