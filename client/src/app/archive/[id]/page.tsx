import type { Metadata } from "next";

import ArchivePage from "@/pages/archive/ArchivePage";
import { fetchArchivedGame } from "@/lib/game";
import type { Game } from "@chessu/types";

export async function generateMetadata({
  params
}: {
  params: { id: number };
}): Promise<Metadata> {
  const game = (await fetchArchivedGame({ id: params.id })) as Game | undefined;
  if (!game) {
    return {
      title: "Game not found | chessu",
      robots: {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true
      }
    };
  }
  return {
    title: "chessu",
    description: `Archived game: ${game.white?.name} vs ${game.black?.name}`,
    openGraph: {
      title: "chessu",
      description: `Archived game: ${game.white?.name} vs ${game.black?.name}`,
      url: `https://ches.su/archive/${game.id}`,
      siteName: "chessu",
      locale: "en_US",
      type: "website"
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      noarchive: true
    }
  };
}

export default async function Archive({ params }: { params: { id: number } }) {
  return <ArchivePage id={Number(params.id)} />;
}
