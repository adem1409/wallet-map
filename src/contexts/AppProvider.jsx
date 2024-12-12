"use client";
import { usePathname } from "next/navigation";
import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window?.innerWidth < 768 : false);

  useEffect(() => {
    function handleResize() {
      if (window?.innerWidth < 768 && !isMobile) {
        setIsMobile(true);
      } else if (window?.innerWidth >= 768 && isMobile) {
        setIsMobile(false);
        setShowMobileSidebar(false);
      }
    }

    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    setShowMobileSidebar(false);
  }, [pathname]);

  return <AppContext.Provider value={{ showMobileSidebar, setShowMobileSidebar, isMobile, setIsMobile }}>{children}</AppContext.Provider>;
}

export default AppProvider;

export function useAppContext() {
  return useContext(AppContext);
}
