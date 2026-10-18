import type { Metadata } from "next";

import ProfilePage from "@/pages/user/ProfilePage";
import { fetchProfileData } from "@/lib/user";

export async function generateMetadata({
  params
}: {
  params: { name: string };
}): Promise<Metadata> {
  const data = await fetchProfileData(params.name);
  if (!data) {
    return {
      title: "User not found | chessu",
      robots: {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true
      }
    };
  }
  return {
    title: `${data.name} | chessu`,
    description: `${data.name}'s profile`,
    openGraph: {
      title: `${data.name} | chessu`,
      description: `${data.name}'s profile on chessu`,
      url: `https://ches.su/user/${data.name}`,
      siteName: "chessu",
      locale: "en_US",
      type: "website"
    },
    robots: {
      index: true,
      follow: false,
      nocache: true
    }
  };
}

export default async function User({ params }: { params: { name: string } }) {
  return <ProfilePage name={params.name} />;
}
