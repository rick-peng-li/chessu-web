import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

import { MORE_NAV, ROUTES } from "@/router/routes";

export default function Footer() {
  return (
    <footer className="footer border-base-300 dark:border-neutral text-base-content mx-1 mt-4 w-auto items-center justify-between border-t-2 p-4 md:mx-16 lg:mx-40">
      <div className="flex flex-col gap-2">
        <p>
          &copy; 2023{" "}
          <a
            href="https://n9ze.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover"
          >
            nize
          </a>
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link href={ROUTES.GAMES} className="link-hover">
            Games
          </Link>
          <Link href={ROUTES.LEADERBOARD} className="link-hover">
            Leaderboard
          </Link>
          {MORE_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="link-hover">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center">
        <a
          href="https://github.com/rick-peng-li/chessu-web"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm gap-1 normal-case"
        >
          <IconBrandGithub className="inline-block" size={16} />
          GitHub
        </a>
      </div>
    </footer>
  );
}
