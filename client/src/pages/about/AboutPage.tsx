import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/router/routes";

// static about page: project introduction, tech stack and links
export default function AboutPage() {
  return (
    <div className="flex w-full flex-col gap-8 py-8">
      <PageHeader title="About chessu" subtitle="A lightweight online chess platform" />

      <section className="flex flex-col gap-2">
        <p>
          chessu is an open-source web application for playing chess online in real time. Create
          a lobby, share the invite link and play against other users — or sit back, spectate
          live games and chat while the action unfolds.
        </p>
        <p>
          Registered players get personal stat tracking (wins, losses, draws), a profile page and
          a searchable archive of finished games that can be replayed move by move.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">Tech stack</h2>
        <div className="bg-base-200 overflow-x-auto rounded-xl">
          <table className="table-compact table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Technologies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Frontend</td>
                <td>Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS + daisyUI, react-chessboard, socket.io-client</td>
              </tr>
              <tr>
                <td>Backend</td>
                <td>Node.js, Express.js, TypeScript, Socket.IO, chess.js, express-session, argon2</td>
              </tr>
              <tr>
                <td>Database</td>
                <td>PostgreSQL (users, archived games, sessions)</td>
              </tr>
              <tr>
                <td>Tooling</td>
                <td>pnpm workspaces monorepo, ESLint, Prettier, Docker</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">Explore the app</h2>
        <div className="flex flex-wrap gap-2">
          <Link href={ROUTES.GAMES} className="btn btn-outline btn-sm">
            Game center
          </Link>
          <Link href={ROUTES.LEADERBOARD} className="btn btn-outline btn-sm">
            Leaderboard
          </Link>
          <Link href={ROUTES.PLAYERS} className="btn btn-outline btn-sm">
            Online players
          </Link>
          <Link href={ROUTES.STATS} className="btn btn-outline btn-sm">
            Platform stats
          </Link>
          <Link href={ROUTES.HELP} className="btn btn-outline btn-sm">
            Help center
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Links</h2>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/rick-peng-li/chessu-web"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-ghost gap-1"
          >
            <IconBrandGithub size={16} />
            GitHub repository
          </a>
          <span className="text-base-content/60 text-sm">
            Released under the MIT License.
          </span>
        </div>
      </section>
    </div>
  );
}
