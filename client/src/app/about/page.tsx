import type { Metadata } from "next";

import AboutPage from "@/pages/about/AboutPage";

export const metadata: Metadata = {
  title: "About | chessu",
  description: "About the chessu online chess platform"
};

export default function About() {
  return <AboutPage />;
}
