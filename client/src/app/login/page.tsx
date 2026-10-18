import type { Metadata } from "next";

import LoginPage from "@/pages/auth/LoginPage";

export const metadata: Metadata = {
  title: "Login | chessu",
  description: "Log in to chessu or continue as a guest"
};

export default function Login() {
  return <LoginPage />;
}
