"use client";

import UpdatePictureModal from "@/components/app/profile/UpdatePictureModal";
import { useAuthContext } from "@/contexts/AuthProvider";
import Image from "next/image";
import React from "react";

export default function Picture() {
  const { user } = useAuthContext();

  console.log("-------------------- user --------------------");
  console.log(user);

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <UpdatePictureModal
        show={showModal}
        hide={() => {
          setShowModal(false);
        }}
      />
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="relative block w-fit mt-4 mx-auto after:absolute after:inset-0 hover:after:bg-black/15 after:rounded-full group after:duration-200"
      >
        <div className="relative w-[150px] aspect-square rounded-full overflow-hidden ring-2 ring-green-600 shadow-[3px_4px_10px_rgb(0,255,0,.4)]">
          <Image src={`${process.env.NEXT_PUBLIC_API_URL}${user?.picture}`} alt="profile picture" className="object-cover" fill />
        </div>
        <div className="absolute bottom-0 right-0 flex items-center justify-center size-6 rounded-full bg-green-600 group-hover:scale-125 duration-200">
          <Pen01Icon className="size-5 text-black fill-white" />
        </div>
      </button>
    </>
  );
}

const Pen01Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      d="M3.49977 18.9853V20.5H5.01449C6.24074 20.5 6.85387 20.5 7.40518 20.2716C7.9565 20.0433 8.39004 19.6097 9.25713 18.7426L19.1211 8.87868C20.0037 7.99612 20.4449 7.55483 20.4937 7.01325C20.5018 6.92372 20.5018 6.83364 20.4937 6.74411C20.4449 6.20253 20.0037 5.76124 19.1211 4.87868C18.2385 3.99612 17.7972 3.55483 17.2557 3.50605C17.1661 3.49798 17.0761 3.49798 16.9865 3.50605C16.4449 3.55483 16.0037 3.99612 15.1211 4.87868L5.25713 14.7426C4.39004 15.6097 3.9565 16.0433 3.72813 16.5946C3.49977 17.1459 3.49977 17.759 3.49977 18.9853Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M13.5 6.5L17.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
