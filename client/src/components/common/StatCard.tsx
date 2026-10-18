import type { ReactNode } from "react";

// stat card used on dashboard-style pages
export default function StatCard({
  title,
  value,
  icon,
  desc
}: {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
  desc?: string;
}) {
  return (
    <div className="bg-base-200 stats shadow">
      <div className="stat">
        <div className="stat-figure text-primary">{icon}</div>
        <div className="stat-title">{title}</div>
        <div className="stat-value text-primary">{value}</div>
        {desc && <div className="stat-desc">{desc}</div>}
      </div>
    </div>
  );
}
