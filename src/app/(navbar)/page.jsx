import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="min-h-[calc(100vh-55px)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Image src="/icon.png" alt="" width={200} height={200} sizes="100vh" />
        <span className={`text-4xl font-semibold mt-1`}>WalletMap</span>
        <p className="text-xl font-medium text-gray">Manage your debts and transactions with shared and local contracts</p>
      </div>
    </div>
  );
}
