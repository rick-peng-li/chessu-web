import type { Metadata } from "next";

import StatsPage from "@/pages/stats/StatsPage";

export const metadata: Metadata = {
  title: "Platform stats | chessu",
  description: "Aggregated statistics across the chessu platform"
};

export default function Stats() {
  return <StatsPage />;
}
