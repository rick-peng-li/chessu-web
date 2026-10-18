"use client";

import { IconLogout, IconSettings2, IconUser, IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useContext } from "react";

import { SessionContext } from "@/context/session";
import { logout } from "@/lib/auth";
import { ROUTES } from "@/router/routes";

// header user entry: anonymous/guest -> link to login page; registered -> account dropdown
export default function UserMenu() {
  const session = useContext(SessionContext);

  if (!session || session.user === undefined) {
    return (
      <span className="btn btn-ghost btn-circle avatar">
        <IconUser className="m-auto block h-full opacity-50" />
      </span>
    );
  }

  async function clickLogout() {
    await logout();
    session?.setUser(null);
  }

  // guest or anonymous: navigate to the standalone login page
  if (session.user === null || typeof session.user.id !== "number") {
    return (
      <Link
        href={ROUTES.LOGIN}
        className="btn btn-ghost btn-circle avatar"
        aria-label="Log in"
        title="Log in"
      >
        <IconUser className="m-auto block h-full" />
      </Link>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="Account menu">
        <IconUserCircle className="m-auto block h-full" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 dark:bg-neutral rounded-box z-50 w-56 gap-1 p-2 shadow"
      >
        <li className="menu-title">
          <span>
            Logged in as <b>{session.user.name}</b>
          </span>
        </li>
        <li>
          <Link href={ROUTES.USER(session.user.name as string)}>
            <IconUserCircle size={18} /> View profile
          </Link>
        </li>
        <li>
          <Link href={ROUTES.SETTINGS}>
            <IconSettings2 size={18} /> Account settings
          </Link>
        </li>
        <li>
          <button onClick={clickLogout}>
            <IconLogout size={18} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
