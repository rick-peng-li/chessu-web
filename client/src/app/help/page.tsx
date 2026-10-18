import type { Metadata } from "next";

import HelpPage from "@/pages/help/HelpPage";

export const metadata: Metadata = {
  title: "Help center | chessu",
  description: "How to play, game modes and frequently asked questions"
};

export default function Help() {
  return <HelpPage />;
}
