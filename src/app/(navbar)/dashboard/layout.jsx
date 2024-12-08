"use client";

import Navbar from "@/components/Navbar";
import { useAuthContext } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return children;
}
