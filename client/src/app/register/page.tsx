import type { Metadata } from "next";

import RegisterPage from "@/pages/auth/RegisterPage";

export const metadata: Metadata = {
  title: "Register | chessu",
  description: "Create a chessu account to track your stats and game history"
};

export default function Register() {
  return <RegisterPage />;
}
