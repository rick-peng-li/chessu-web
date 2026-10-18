"use client";

import { IconDoorEnter, IconLogin } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useContext, useState } from "react";

import Guest from "@/components/auth/Guest";
import Login from "@/components/auth/Login";
import { SessionContext } from "@/context/session";
import { login, setGuestSession } from "@/lib/auth";
import { ROUTES } from "@/router/routes";

// standalone login page with account login and guest entry
export default function LoginPage() {
  const session = useContext(SessionContext);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"login" | "guest">("login");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  // already signed in: offer navigation instead of the form
  if (session?.user?.id) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <h1 className="text-2xl font-bold">
          Logged in as <b>{session.user.name}</b>
        </h1>
        <p className="text-base-content/70">You are already signed in.</p>
        <div className="flex gap-2">
          <Link href={ROUTES.HOME} className="btn btn-primary">
            Back to lobby
          </Link>
          <Link href={ROUTES.SETTINGS} className="btn btn-ghost">
            Account settings
          </Link>
        </div>
      </div>
    );
  }

  async function submitAuth(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    if (activeTab === "login") {
      const loginName = target.elements.namedItem("loginName") as HTMLInputElement;
      const loginPassword = target.elements.namedItem("loginPassword") as HTMLInputElement;
      if (!loginName?.value || !loginPassword?.value) return;

      setButtonLoading(true);
      const user = await login(loginName.value, loginPassword.value);
      setButtonLoading(false);

      if (typeof user === "string") {
        setServerMessage(user);
      } else if (user?.id) {
        session?.setUser(user);
        router.push(ROUTES.HOME);
      }
    } else {
      const guestName = target.elements.namedItem("guestName") as HTMLInputElement;
      if (!guestName?.value) return;

      setButtonLoading(true);
      const user = await setGuestSession(guestName.value);
      setButtonLoading(false);

      if (user) {
        session?.setUser(user);
        router.push(ROUTES.HOME);
      }
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 py-10">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold">Welcome to chessu</h1>
        <p className="text-base-content/70 mt-2">
          Log in to track your stats, or continue as a guest to play right away.
        </p>
      </div>

      <div className="bg-base-200 w-full max-w-sm rounded-xl p-6">
        <div className="tabs boxed mb-4 grid grid-cols-2">
          <button
            className={"tab gap-1" + (activeTab === "login" ? " tab-active" : "")}
            onClick={() => {
              setActiveTab("login");
              setServerMessage(null);
            }}
          >
            <IconLogin size={16} />
            Login
          </button>
          <button
            className={"tab gap-1" + (activeTab === "guest" ? " tab-active" : "")}
            onClick={() => {
              setActiveTab("guest");
              setServerMessage(null);
            }}
          >
            <IconDoorEnter size={16} />
            Guest
          </button>
        </div>

        <form className="flex flex-col" onSubmit={submitAuth}>
          {activeTab === "login" && <Login />}
          {activeTab === "guest" && <Guest currentName={session?.user?.name || "unknown user"} />}

          {serverMessage && <div className="text-error mt-2">{serverMessage}</div>}

          <button className={"btn btn-primary mt-4" + (buttonLoading ? " loading" : "")} type="submit">
            {activeTab === "login" ? "Login" : "Continue as guest"}
          </button>
        </form>

        <div className="divider text-xs">new here?</div>
        <Link href={ROUTES.REGISTER} className="btn btn-outline btn-sm w-full">
          Create an account
        </Link>
      </div>
    </div>
  );
}
