"use client";

import AddContractModal from "@/components/app/debt-manager/AddContractModal";
import DeleteContractModal from "@/components/app/debt-manager/DeleteContractModal";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TransactionsList({ contract, transactions, fetchContracts = () => {} }) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contractToDelete, setContractToDelete] = useState(null);
  const router = useRouter();

  console.log("-------------------- transactions --------------------");
  console.log(transactions);

  return (
    <>
      {/* <AddContractModal
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
      /> */}
      <div className="grow mt-4 bg-white border border-slate-200 rounded-lg py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 px-3">
          <h2 className="text-lg font-semibold">Transactions</h2>
          {/* <button
            onClick={() => {
              setShowModal(true);
            }}
            className={`flex items-center gap-1 py-1 pl-6 pr-8 rounded bg-green-800 hover:bg-green-900 text-white text-[15px] duration-200`}
            href="/auth/login"
          >
            <PlusIcon className="size-5" />
            <span>Create New</span>
          </button> */}
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead className="">
            <tr className="border-b [&>:first-child]:pl-3 [&>:last-child]:pr-3 text-sm">
              <th className="pb-2">Label</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Date</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {transactions?.length ? (
              transactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="border-b hover:bg-slate-100 transition duration-200 [&>:first-child]:pl-3 [&>:last-child]:pr-3 text-sm  has-[.first-link:focus]:custom-outline ring-inset"
                >
                  <td className="">
                    <Link className="first-link block py-1.5 no-outline" href={`/app/debt-manager/${transaction.id}`} passHref>
                      <div className="flex items-center gap-2">{transaction.label}</div>
                    </Link>
                  </td>
                  <td className="">
                    <p className={`font-semibold ${transaction.amount >= 0 ? "text-green-600" : "text-red-500"}`}>
                      {transaction.amount} {contract.currency}
                    </p>
                  </td>
                  <td>
                    <Link tabIndex={-1} className="block py-1.5 no-outline" href={`/app/debt-manager/${transaction.id}`} passHref>
                      <p className="text-xs">
                        {new Date(transaction.date).toLocaleDateString("en-UK", {
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
                        setContractToDelete(transaction);
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
                  There are no transaction yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
