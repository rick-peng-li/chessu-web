"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useContext, useState } from "react";

import Register from "@/components/auth/Register";
import { SessionContext } from "@/context/session";
import { register } from "@/lib/auth";
import { ROUTES } from "@/router/routes";

// standalone registration page
export default function RegisterPage() {
  const session = useContext(SessionContext);
  const router = useRouter();

  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  if (session?.user?.id && typeof session.user.id === "number") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <h1 className="text-2xl font-bold">
          Logged in as <b>{session.user.name}</b>
        </h1>
        <p className="text-base-content/70">You already have an account and are signed in.</p>
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

  async function submitRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const registerName = target.elements.namedItem("registerName") as HTMLInputElement;
    const registerEmail = target.elements.namedItem("registerEmail") as HTMLInputElement;
    const registerPassword = target.elements.namedItem("registerPassword") as HTMLInputElement;
    if (!registerName?.value || !registerPassword?.value) return;

    setButtonLoading(true);
    const user = await register(
      registerName.value,
      registerPassword.value,
      registerEmail?.value || undefined
    );
    setButtonLoading(false);

    if (typeof user === "string") {
      setServerMessage(user);
    } else if (user?.id) {
      session?.setUser(user);
      router.push(ROUTES.HOME);
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 py-10">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="text-base-content/70 mt-2">
          Registered players get win/loss/draw tracking and a game history archive.
        </p>
      </div>

      <div className="bg-base-200 w-full max-w-sm rounded-xl p-6">
        <form className="flex flex-col" onSubmit={submitRegister}>
          <Register />

          {serverMessage && <div className="text-error mt-2">{serverMessage}</div>}

          <button className={"btn btn-primary mt-4" + (buttonLoading ? " loading" : "")} type="submit">
            Register
          </button>
        </form>

        <div className="divider text-xs">already registered?</div>
        <Link href={ROUTES.LOGIN} className="btn btn-outline btn-sm w-full">
          Log in instead
        </Link>
      </div>
    </div>
  );
}
