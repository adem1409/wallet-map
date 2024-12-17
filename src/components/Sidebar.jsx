"use client";

import SidebarItem from "@/components/SidebarItem";
import SidebarUserInfo from "@/components/SidebarUserInfo";
import { useAppContext } from "@/contexts/AppProvider";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Cog6ToothIcon, DocumentCheckIcon, HomeIcon, ListBulletIcon, UserIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { showMobileSidebar, setShowMobileSidebar, isMobile, setIsMobile } = useAppContext();

  return (
    <>
      {/*  ---------------------------- Desktop Sidebar ---------------------------- */}
      {/*  ---------------------------- Desktop Sidebar ---------------------------- */}

      <div className="shrink-0 self-start sticky top-[65px] min-h-[calc(100vh-75px)] rounded-lg w-[230px] bg-white hidden md:block overflow-hidden border border-slate-200">
        <SidebarUserInfo />
        <ul className="text-sm font-medium px-2">
          {items1.map((item, index) => (
            <li key={index}>
              <SidebarItem item={item} />
            </li>
          ))}
          <li>
            <div className="h-px my-2 bg-slate-300"></div>
          </li>
          {items2.map((item, index) => (
            <li key={index}>
              <SidebarItem item={item} />
            </li>
          ))}
        </ul>
      </div>

      {/*  ---------------------------- Mobile Sidebar ---------------------------- */}
      {/*  ---------------------------- Mobile Sidebar ---------------------------- */}
      <Dialog
        open={isMobile && showMobileSidebar}
        onClose={() => {
          setShowMobileSidebar(false);
        }}
        className="relative z-50"
      >
        {isMobile && <DialogBackdrop transition className="fixed inset-0 bg-black/30 cursor-pointer duration-200 data-[closed]:opacity-0" />}

        {/* Full-screen container to center the panel */}
        {/* The actual dialog panel  */}
        <DialogPanel
          transition
          className={`fixed md:top-[70px] md:left-[15px] md:bottom-[15px] top-0 left-0 bottom-0 w-full max-w-[280px] bg-white overflow-hidden shadow-[1px_1px_40px_rgb(0,0,0,.2)] duration-200 data-[closed]:-translate-x-full`}
        >
          {/*  ---------------------------- Start Sidebar Content ---------------------------- */}
          {/*  ---------------------------- Start Sidebar Content ---------------------------- */}
          <SidebarUserInfo />
          <ul className="text-sm font-medium px-2">
            {items1.map((item, index) => (
              <li key={index}>
                <SidebarItem item={item} />
              </li>
            ))}
            <li>
              <div className="h-px my-2 bg-slate-300"></div>
            </li>
            {items2.map((item, index) => (
              <li key={index}>
                <SidebarItem item={item} />
              </li>
            ))}
          </ul>
          {/*  ---------------------------- Start Sidebar Content ---------------------------- */}
          {/*  ---------------------------- Start Sidebar Content ---------------------------- */}
        </DialogPanel>
      </Dialog>
    </>
  );
}

const Doctor02Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"currentColor"} fill={"none"} {...props}>
    <path
      d="M4 22.0002V21.0002C4 19.131 4 18.1964 4.40192 17.5002C4.66523 17.0442 5.04394 16.6655 5.5 16.4022C6.19615 16.0002 7.13077 16.0002 9 16.0002L12 20.0002L15 16.0002C16.8692 16.0002 17.8038 16.0002 18.5 16.4022C18.9561 16.6655 19.3348 17.0442 19.5981 17.5002C20 18.1964 20 19.131 20 21.0002V22.0002"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9374 7.99976L16.9552 3.86408C17.1882 2.91735 16.4833 2.00024 15.5228 2.00024H8.47724C7.51665 2.00024 6.81182 2.91735 7.04482 3.86407L8.06263 7.99976M15.9374 7.99976V9.99976C15.9374 12.2089 14.1745 13.9998 12 13.9998C9.82545 13.9998 8.06263 12.2089 8.06263 9.99976V7.99976M15.9374 7.99976H8.06263"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11.9998 4.00024V5.99976M12.9995 5L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const items1 = [
  {
    name: "Dashboard",
    Icon: <HomeIcon className="size-5" />,
    path: "/app",
    strict: true,
  },
  {
    name: "Debt Manager",
    Icon: <DocumentCheckIcon className="size-5" />,
    path: "/app/debt-manager",
  },
  {
    name: "Transactions",
    Icon: <ArrowsRightLeftIcon className="size-5" />,
    path: "/app/transactions",
  },
  {
    name: "Contacts",
    Icon: <ListBulletIcon className="size-5" />,
    path: "/app/contacts",
  },
  {
    name: "Profile",
    // Icon: <Doctor02Icon className="size-5" />,
    Icon: <UserIcon className="size-5" />,
    path: "/app/profile",
  },
];

const items2 = [
  // {
  //   name: "Profile",
  //   Icon: <UserIcon className="size-5" />,
  //   path: "/dashboard/profile",
  // },
  {
    name: "Settings",
    Icon: <Cog6ToothIcon className="size-5" />,
    path: "/admin/settings",
  },
  {
    name: "Home",
    Icon: <HomeIcon className="size-5" />,
    path: "/",
    strict: true,
  },
];
