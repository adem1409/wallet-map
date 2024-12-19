"use client";
import AddTransaction from "@/components/app/debt-manager/[id]/AddTransaction";
import ContractDetails from "./ContractDetails";
import TransactionsList from "./TransactionsList";
import { useMemo } from "react";
import { useAuthContext } from "@/contexts/AuthProvider";

export default function Contract({ contract, transactions }) {
  const { user } = useAuthContext();

  const userSide = useMemo(() => {
    return user?.id === contract.sideA?.id ? "sideA" : "sideBShared";
  }, [contract]);
  const otherUserSide = useMemo(() => {
    if (contract.shared) {
      return user?.id === contract.sideA?.id ? "sideBShared" : "sideA";
    } else {
      return user?.id === contract.sideA?.id ? "sideBLocal" : "sideA";
    }
  }, [contract]);

  return (
    <div className="pt-2 pl-4 pb-20">
      <h3 className="text-2xl font-semibold text-slate-700">Contract</h3>
      <ContractDetails contract={contract} userSide={userSide} otherUserSide={otherUserSide} />
      <AddTransaction contract={contract} userSide={userSide} otherUserSide={otherUserSide} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}
