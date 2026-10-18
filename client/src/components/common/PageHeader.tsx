import type { ReactNode } from "react";

// shared page header with optional action slot
export default function PageHeader({
  title,
  subtitle,
  action
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-base-content/70">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
