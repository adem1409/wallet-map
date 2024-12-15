"use client";

import { CubeLoader } from "@/components/Loaders";
import Navbar from "@/components/Navbar";
import FixedSidebar from "@/components/FixedSidebar";
import { useAuthContext } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";

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

  return (
    <div className="px-2">
      <div className="flex max-w-7xl min-h-[calc(100vh-55px)] mx-auto py-[10px]">
        <Sidebar />
        <div className="grow">{children}</div>
      </div>
    </div>
  );
}
