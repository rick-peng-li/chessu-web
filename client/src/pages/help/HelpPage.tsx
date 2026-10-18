import Link from "next/link";

import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/router/routes";

// static help center: getting started, rules and FAQ
export default function HelpPage() {
  return (
    <div className="flex w-full flex-col gap-8 py-8">
      <PageHeader
        title="Help center"
        subtitle="Everything you need to know to start playing on chessu"
      />

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">Getting started</h2>
        <ol className="list-decimal gap-2 space-y-1 pl-6">
          <li>
            Enter the site — you can play instantly by continuing as a{" "}
            <b>guest</b>, or{" "}
            <Link href={ROUTES.REGISTER} className="link text-primary">
              register an account
            </Link>{" "}
            to keep your stats.
          </li>
          <li>
            On the{" "}
            <Link href={ROUTES.HOME} className="link text-primary">
              home page
            </Link>
            , create a game by picking your side (white, black or random) or join an existing
            lobby from the public games list.
          </li>
          <li>
            Share the invite link or 6-character code with a friend, or wait for another player
            to join your lobby.
          </li>
          <li>Once both seats are taken the clock starts — good luck!</li>
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">How to play</h2>
        <div className="flex flex-col gap-2">
          <p>
            <b>Objective:</b> checkmate your opponent&apos;s king — put it under attack with no
            legal escape. You can also win if your opponent abandons the game.
          </p>
          <p>
            <b>Moving pieces:</b> drag a piece to a legal square, or click the piece and then the
            target square. Illegal moves are rejected by the server, so the position always stays
            in sync.
          </p>
          <p>
            <b>Special moves:</b> castling, en passant and pawn promotion (promoting to a queen
            by default) are all supported and validated automatically.
          </p>
          <p>
            <b>Game endings:</b> checkmate, stalemate, threefold repetition, insufficient
            material, agreed draw, or abandonment.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">Game modes</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-base-200 rounded-xl p-4">
            <h3 className="font-bold">Public games</h3>
            <p className="text-base-content/70 mt-1 text-sm">
              Listed in the lobby and the{" "}
              <Link href={ROUTES.GAMES} className="link text-primary">
                game center
              </Link>
              , anyone can join or spectate.
            </p>
          </div>
          <div className="bg-base-200 rounded-xl p-4">
            <h3 className="font-bold">Unlisted games</h3>
            <p className="text-base-content/70 mt-1 text-sm">
              Invite-only. The game is hidden from public lists — only players with the link can
              join.
            </p>
          </div>
          <div className="bg-base-200 rounded-xl p-4">
            <h3 className="font-bold">Spectating</h3>
            <p className="text-base-content/70 mt-1 text-sm">
              Watch any ongoing game live and chat with other spectators while the game unfolds.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">FAQ</h2>
        <div className="flex flex-col gap-2">
          <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title">Do I need an account to play?</summary>
            <div className="collapse-content">
              <p>
                No — guest mode lets you play immediately. An account only adds stat tracking,
                a profile page and a game history archive.
              </p>
            </div>
          </details>
          <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title">What happens if my opponent disconnects?</summary>
            <div className="collapse-content">
              <p>
                The game waits briefly for a reconnect. After about a minute you can claim a win
                or a draw from the game page.
              </p>
            </div>
          </details>
          <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title">Where can I see my past games?</summary>
            <div className="collapse-content">
              <p>
                Your profile page lists recent games with results, and every finished game can be
                replayed move by move from its archive page.
              </p>
            </div>
          </details>
          <details className="collapse collapse-arrow bg-base-200">
            <summary className="collapse-title">How are games timed?</summary>
            <div className="collapse-content">
              <p>
                chessu is casual — there is no per-move clock. Empty lobbies are cleaned up after
                one minute, and started games after twenty minutes of inactivity.
              </p>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
