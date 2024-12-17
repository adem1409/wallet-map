"use client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import toast from "react-hot-toast";

export default function CustomToast({ t, message, type = "success" }) {
  const icons = {
    success: <CheckCircleIcon className="size-8 text-white" />,
    error: <ExclamationCircleIcon className="size-8 text-white" />,
    info: <InformationCircleIcon className="size-8 text-white" />,
  };

  const colors = {
    success: "bg-green-500 ring-green-600",
    error: "bg-red-500 ring-red-600",
    info: "bg-blue-500 ring-blue-600",
  };

  return (
    <div
      className={`${t.visible ? "animate-enter" : "animate-leave"} grid grid-cols-[25px_1fr] gap-4 items-center max-w-[350px] w-full px-2 py-2 ${
        colors[type]
      } shadow-lg rounded-lg pointer-events-auto ring-1 ${colors[type]}`}
    >
      <div className="">{icons[type]}</div>
      <div className="text-sm text-white font-medium">{message}</div>
    </div>
  );
}