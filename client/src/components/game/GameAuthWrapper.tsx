"use client";

import { SessionContext } from "@/context/session";
import { setGuestSession } from "@/lib/auth";
import { ROUTES } from "@/router/routes";
import type { Game } from "@chessu/types";
import Link from "next/link";
import type { FormEvent } from "react";
import { useContext, useState } from "react";

import Guest from "../auth/Guest";
import GamePage from "./GamePage";

export default function GameAuthWrapper({ initialLobby }: { initialLobby: Game }) {
  const session = useContext(SessionContext);
  const [buttonLoading, setButtonLoading] = useState(false);

  async function submitGuest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const guestName = target.elements.namedItem("guestName") as HTMLInputElement;
    if (!guestName?.value) return;

    setButtonLoading(true);
    const user = await setGuestSession(guestName.value);
    if (user) {
      session?.setUser(user);
    }
    setButtonLoading(false);
  }

  if (!session || session.user === undefined) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-2xl font-bold">Loading</div>
        <div className="text-xl">Waiting for authentication...</div>
      </div>
    );
  }

  // not logged in: offer guest entry or a link to the standalone login page
  if (session.user === null) {
    return (
      <div className="flex w-full flex-col items-center gap-6 py-10">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold">Join this game</h1>
          <p className="text-base-content/70 mt-2">
            Pick a guest name to play or spectate right away.
          </p>
        </div>
        <div className="bg-base-200 w-full max-w-sm rounded-xl p-6">
          <form className="flex flex-col" onSubmit={submitGuest}>
            <Guest currentName="unknown user" />
            <button
              className={"btn btn-primary mt-4" + (buttonLoading ? " loading" : "")}
              type="submit"
            >
              Continue as guest
            </button>
          </form>
          <div className="divider text-xs">or</div>
          <Link href={ROUTES.LOGIN} className="btn btn-outline btn-sm w-full">
            Log in to your account
          </Link>
        </div>
      </div>
    );
  }

  return <GamePage initialLobby={initialLobby} />;
}
