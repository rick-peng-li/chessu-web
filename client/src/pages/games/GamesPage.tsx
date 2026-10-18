"use client";

import Link from "next/link";
import { useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import FinishedGames from "@/components/games/FinishedGames";
import OngoingGames from "@/components/games/OngoingGames";
import { ROUTES } from "@/router/routes";

// game center: browse ongoing and finished games
export default function GamesPage() {
  const [activeTab, setActiveTab] = useState<"ongoing" | "finished">("ongoing");

  return (
    <div className="flex w-full flex-col gap-6 py-8">
      <PageHeader
        title="Game center"
        subtitle="Browse ongoing public games or revisit finished ones"
        action={
          <Link href={ROUTES.HOME} className="btn btn-primary btn-sm">
            Create a game
          </Link>
        }
      />

      <div role="tablist" className="tabs-boxed tabs w-fit">
        <button
          role="tab"
          className={"tab" + (activeTab === "ongoing" ? " tab-active" : "")}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing games
        </button>
        <button
          role="tab"
          className={"tab" + (activeTab === "finished" ? " tab-active" : "")}
          onClick={() => setActiveTab("finished")}
        >
          Finished games
        </button>
      </div>

      {activeTab === "ongoing" ? <OngoingGames /> : <FinishedGames />}
    </div>
  );
}
