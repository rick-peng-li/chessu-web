import CopyLink from "@/components/user/CopyLink";
import { fetchProfileData } from "@/lib/user";
import { ROUTES } from "@/router/routes";
import { endReasonLabel } from "@/utils/game";
import { formatDateTime } from "@/utils/format";
import { notFound } from "next/navigation";

// public profile page: stats and recent games for a registered user
export default async function ProfilePage({ name }: { name: string }) {
  const data = await fetchProfileData(name);
  if (!data) {
    notFound();
  }

  return (
    <div className="mt-8 flex w-full flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <span className="text-sm">Wins</span>
            <span className="text-xl font-bold">{data.wins}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm">Draws</span>
            <span className="text-xl font-bold">{data.draws}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm">Losses</span>
            <span className="text-xl font-bold">{data.losses}</span>
          </div>
        </div>
        <CopyLink name={data.name as string} />
      </div>

      <div>
        <h2 className="mb-1 text-lg font-bold">Recent games</h2>
        <ul className="bg-base-300 flex h-[60vh] flex-col gap-1 overflow-y-scroll rounded-lg">
          {data.recentGames.map((game) => (
            <li
              key={game.id}
              className="border-base-100 flex flex-wrap items-center justify-between gap-8 border-b-2 p-3"
            >
              <div className="flex w-72 justify-between">
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-sm">
                    White
                    {game.winner === "white" && (
                      <span className="badge badge-xs badge-success">winner</span>
                    )}
                  </span>
                  <a
                    className={
                      "font-bold" +
                      (typeof game.white?.id === "number" ? " text-primary link-hover" : " cursor-default")
                    }
                    href={
                      typeof game.white?.id === "number" && game.white?.id !== data.id
                        ? ROUTES.USER(game.white?.name as string)
                        : undefined
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {game.white?.name}
                  </a>
                </div>
                <div className="flex flex-col items-end">
                  <span className="flex items-center gap-1 text-sm">
                    {game.winner === "black" && (
                      <span className="badge badge-xs badge-success">winner</span>
                    )}
                    Black
                  </span>
                  <a
                    className={
                      "font-bold" +
                      (typeof game.black?.id === "number" ? " text-primary link-hover" : " cursor-default")
                    }
                    href={
                      typeof game.black?.id === "number" && game.black?.id !== data.id
                        ? ROUTES.USER(game.black?.name as string)
                        : undefined
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {game.black?.name}
                  </a>
                </div>
              </div>

              <div className="flex-grow text-end text-xs">{endReasonLabel(game.endReason)}</div>

              <div className="flex flex-grow flex-col text-end">
                <span className="text-xs">
                  Started
                  <span className="font-bold"> {formatDateTime(game.startedAt)}</span>
                </span>
                <span className="text-xs">
                  Ended
                  <span className="font-bold"> {formatDateTime(game.endedAt)}</span>
                </span>
              </div>

              <a
                className="btn btn-ghost flex-grow"
                href={ROUTES.ARCHIVE(game.id as number)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Review game
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
