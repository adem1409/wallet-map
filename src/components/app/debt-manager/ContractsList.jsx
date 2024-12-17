"use client";

import AddContractModal from "@/components/app/debt-manager/AddContractModal";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ContractsList({ contracts, fetchContracts = () => {} }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  console.log("-------------------- contracts --------------------");
  console.log(contracts);

  return (
    <>
      <AddContractModal
        hide={() => {
          setShowModal(false);
        }}
        show={showModal}
        fetchContracts={fetchContracts}
      />
      <div className="mt-4 bg-white border border-slate-200 rounded-lg py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 px-3">
          <h2 className="text-lg font-semibold">Contracts</h2>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className={`flex items-center gap-1 py-1 pl-6 pr-8 rounded bg-green-800 hover:bg-green-900 text-white text-[15px] duration-200`}
            href="/auth/login"
          >
            <PlusIcon className="size-5" />
            <span>Create New</span>
          </button>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead className="">
            <tr className="border-b [&>:first-child]:pl-3 [&>:last-child]:pr-3 text-sm">
              <th className="pb-2">Label</th>
              <th className="pb-2">Contact</th>
              <th className="pb-2">Currency</th>
              <th className="pb-2">Last Updated</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {contracts?.length ? (
              contracts.map((contract, index) => (
                <tr
                  key={contract.id}
                  className="border-b hover:bg-slate-100 transition duration-200 [&>:first-child]:pl-3 [&>:last-child]:pr-3 text-sm cursor-pointer has-[.first-link:focus]:custom-outline ring-inset"
                >
                  <td className="">
                    <Link className="first-link block py-1.5 no-outline" href={`/app/debt-manager/${contract.id}`} passHref>
                      <div className="flex items-center gap-2">
                        <div className="text-blue-500">📄 {/* Replace with a real icon in a production app */}</div>
                        {contract.name}
                      </div>
                    </Link>
                  </td>
                  <td className="">
                    {contract.sideBShared ? (
                      <Link tabIndex={-1} className="block py-1.5 no-outline" href={`/app/debt-manager/${contract.id}`} passHref>
                        <div className="flex items-center gap-2">
                          <div className="relative shrink-0 size-[25px] rounded-full border border-slate-400 overflow-hidden">
                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${contract.sideBShared?.picture}`} fill className="" sizes="50px" alt="" />
                          </div>
                          <p>{contract.sideBShared?.email}</p>
                        </div>
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-gray-600">
                    <Link tabIndex={-1} className="block py-1.5 no-outline" href={`/app/debt-manager/${contract.id}`} passHref>
                      <div className="flex items-center gap-2">
                        <Image src={`/flags/${contract.currency}.png`} alt={`${contract.currency}.png`} width={20} height={20} />
                        <p>{contract.currency}</p>
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Link tabIndex={-1} className="block py-1.5 no-outline" href={`/app/debt-manager/${contract.id}`} passHref>
                      {new Date(contract.creationDate).toLocaleDateString("en-UK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        // hour: "2-digit",
                        // minute: "2-digit",
                      })}
                    </Link>
                  </td>
                  <td className="py-1.5">
                    <button className="ml-auto size-6 flex items-center justify-center rounded hover:bg-slate-200 transition">
                      <TrashIcon className="size-5 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 text-center text-slate-600 font-semibold " colSpan="4">
                  You have no contracts yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
