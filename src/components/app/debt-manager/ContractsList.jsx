"use client";

import AddContractModal from "@/components/app/debt-manager/AddContractModal";
import DeleteContractModal from "@/components/app/debt-manager/DeleteContractModal";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ContractsList({ contracts, fetchContracts = () => {} }) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contractToDelete, setContractToDelete] = useState(null);
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
      <DeleteContractModal
        hide={() => {
          setShowDeleteModal(false);
        }}
        afterLeave={() => {
          setContractToDelete(null);
        }}
        show={showDeleteModal}
        toDelete={contractToDelete}
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
              <th className="w-0"></th>
              <th className="pb-2">Label</th>
              <th className="pb-2">Contact</th>
              <th className="pb-2">Currency</th>
              <th className="pb-2">Balance</th>
              <th className="pb-2">Modified</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {contracts?.length ? (
              contracts.map((contract, index) => (
                <tr
                  key={contract.id}
                  className="border-b hover:bg-slate-100 transition duration-200 [&>:first-child]:pl- [&>:last-child]:pr-3 text-sm  has-[.first-link:focus]:custom-outline ring-inset"
                >
                  <td className="h-px">
                    <div
                      title={contract.shared ? "Shared" : "Local"}
                      className={`h-full w-1.5 rounded-r-sm ${contract.shared ? "bg-blue-500" : "bg-slate-400"}`}
                    ></div>
                  </td>
                  <td className="">
                    <Link className="first-link block py-1.5 no-outline" href={`/app/debt-manager/${contract.id}`} passHref>
                      <div className="flex items-center gap-2">{contract.name}</div>
                    </Link>
                  </td>
                  <td className="">
                    {contract.sideBShared ? (
                      <Link tabIndex={-1} className="block py-1.5 no-outline" href={`/app/debt-manager/${contract.id}`} passHref>
                        <div className="flex items-center gap-2">
                          <div className="relative shrink-0 size-[25px] rounded-full border border-slate-400 overflow-hidden">
                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${contract.sideBShared?.picture}`} fill className="" sizes="50px" alt="" />
                          </div>
                          <p>{contract.sideBShared?.username}</p>
                        </div>
                      </Link>
                    ) : contract.sideBLocal ? (
                      <Link tabIndex={-1} className="block py-1.5 no-outline" href={`/app/debt-manager/${contract.id}`} passHref>
                        <div className="flex items-center gap-2">
                          <div className="relative shrink-0 size-[25px] rounded-full border border-slate-400 overflow-hidden">
                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}${contract.sideBLocal?.picture}`} fill className="" sizes="50px" alt="" />
                          </div>
                          <p>{contract.sideBLocal?.name}</p>
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
                  <td className="text-gray-600">
                    <Link tabIndex={-1} className="block py-1.5 no-outline" href={`/app/debt-manager/${contract.id}`} passHref>
                      <p className={`font-semibold ${contract.netBalance > 0 ? "text-green-600" : contract.netBalance < 0 ? "text-red-500" : "text-gray-600"}`}>
                        {Number(contract.netBalance.toFixed(2))} {contract.currency}
                      </p>
                    </Link>
                  </td>
                  <td>
                    <Link tabIndex={-1} className="block py-1.5 no-outline" href={`/app/debt-manager/${contract.id}`} passHref>
                      <p className="text-xs">
                        {new Date(contract.createdAt).toLocaleDateString("en-UK", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </Link>
                  </td>
                  <td className="py-1.5">
                    <button
                      onClick={() => {
                        setContractToDelete(contract);
                        setShowDeleteModal(true);
                      }}
                      className="ml-auto size-6 flex items-center justify-center rounded hover:bg-slate-200 transition"
                    >
                      <TrashIcon className="size-5 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-8 text-center text-slate-600 font-semibold " colSpan="6">
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
