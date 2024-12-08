"use client";

import Dropdown from "@/components/Dropdown";
// import { useAppContext } from "@/contexts/AppProvider";
import { useAuthContext } from "@/contexts/AuthProvider";
import { ArrowLeftStartOnRectangleIcon, Bars3Icon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const { user, logout } = useAuthContext();
  //   const { setShowMobileSidebar } = useAppContext();
  const pathname = usePathname();

  async function handleLogout() {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  }

  const dropdownItems = [
    <Link
      href="/dashboard"
      className="grid grid-cols-[25px_1fr] items-center py-2 px-3 rounded font-normal text-black text-[15px] hover:bg-slate-200 transition duration-300"
    >
      <UserIcon className="size-4" />
      <span>Dashboard</span>
    </Link>,
    <button
      onClick={handleLogout}
      className="grid grid-cols-[25px_1fr] items-center w-full text-left py-2 px-3 rounded font-normal text-black text-[15px] hover:bg-slate-200 transition duration-300"
    >
      <ArrowLeftStartOnRectangleIcon className="size-4" />
      <span>Logout</span>
    </button>,
  ];

  return (
    <header className="shrink-0 fixed w-full top-0 left-0 z-[20] flex items-center h-[55px] px-4 bg-white shadow-md">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {pathname !== "/" && (
            <button
              className={`block md:hidden`}
              onClick={() => {
                setShowMobileSidebar(true);
              }}
            >
              <Bars3Icon className="h-7 w-7 text-green-700" />
            </button>
          )}
          <Link className="flex items-center gap-2" href="/">
            <Image src="/icon.png" alt="" width={32} height={32} />
            <span className={`text-lg font-semibold mt-1`}>WalletMap</span>
          </Link>
        </div>
        <ul className="hidden sm:flex items-center gap-4 justify-between  mx-auto text-[10px] lg:text-sm font-medium">
          {items.map((item, index) => {
            if (item.items) {
              return (
                <li key={index}>
                  <Dropdown
                    items={item.items}
                    position="left"
                    renderItem={(item) => (
                      <Link href={item.path || ""} className="block py-2 px-3 rounded text-black hover:bg-slate-200 transition duration-300 font-normal">
                        {item.label}
                      </Link>
                    )}
                  >
                    {(isOpen) => (
                      <div className={`flex items-center gap-2 hover:underline underline-offset-4`}>
                        {item.label}
                        <ChevronDownIcon className={`w-6 h-6 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
                      </div>
                    )}
                  </Dropdown>
                </li>
              );
            } else {
              return (
                <li key={index} className="">
                  <Link href={item.path} className="block py-2 font-open transition duration-500 hover:underline underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        <div className="flex items-center gap-4">
          {user ? (
            <Dropdown items={dropdownItems} position="right" renderItem={(item) => item}>
              {(isOpen) => (
                <div className={`relative`}>
                  <div className="relative w-10 aspect-square rounded-full border border-green-600 overflow-hidden">
                    <Image src={`/api/image?imageUrl=/uploads/profile-pictures/${user?.picture}`} alt="" className="object-cover" fill />
                  </div>
                  {/* {user?.username} */}
                  <i className="absolute bottom-0 right-0 translate-x-1 translate-y-1 flex items-center justify-center size-4 bg-white rounded-full overflow-hidden">
                    <ChevronDownIcon className={`size-4 duration-200 ${isOpen ? "-rotate-180" : ""}`} />
                  </i>
                </div>
              )}
            </Dropdown>
          ) : (
            <Link
              className={`flex items-center gap-1 py-1 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white text-[15px] duration-200`}
              href="/auth/login"
            >
              <LockClosedIcon className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
          {/* <ShoppingCartIcon className="h-6" /> */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

function ChevronDownIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const items = [
  {
    label: "Home",
    items: [
      {
        label: "Notre Histoire",
        path: "/history",
      },
      {
        label: "Principes et Valeurs",
        path: "/values",
      },
      {
        label: "Nos Réalisations",
        path: "/achievements",
      },
      {
        label: "Notre Équipe",
        path: "/team",
      },
      {
        label: "Partenaires",
        path: "/partners",
      },
      {
        label: "Rapport Financier",
        path: "/financial-report",
      },
    ],
  },
  {
    label: "Contact",
    items: [
      {
        label: "Info",
        path: "/info",
      },
      {
        label: "Suivi Scientifique",
        path: "/scientific-research",
      },
      {
        label: "Formation et Campement Scientifique",
        path: "/achievements",
      },
      {
        label: "Équipe",
        path: "/team",
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Prochains Festivals",
        path: "/next-festivals",
      },
      {
        label: "Éditions Précédentes",
        path: "/previous-editions",
      },
    ],
  },
  {
    label: "News",
    path: "/news",
  },
];
