"use client";

import { CubeLoader } from "@/components/Loaders";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
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

  return (
    <div>
      <Sidebar />
      <div className="md:ml-[230px]">{children}</div>
    </div>
  );
}
