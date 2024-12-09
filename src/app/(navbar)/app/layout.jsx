"use client";

import { CubeLoader } from "@/components/Loaders";
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

  if (!user) {
    return (
      <div className="min-w-screen min-h-screen flex items-center justify-center">
        <CubeLoader />
      </div>
    );
  }

  return children;
}
