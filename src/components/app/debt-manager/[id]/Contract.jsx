"use client";
import AddTransaction from "@/components/app/debt-manager/[id]/AddTransaction";
import ContractDetails from "./ContractDetails";
import TransactionsList from "./TransactionsList";
import { useMemo } from "react";
import { useAuthContext } from "@/contexts/AuthProvider";

export default function Contract({ contract, transactions }) {
  const { user } = useAuthContext();

  const otherContact = useMemo(() => {
    return user?.id === contract.sideA?.id ? contract.sideBShared || contract.sideBLocal : contract.sideA;
  }, [contract]);

  return (
    <div className="pt-2 pl-4 pb-20">
      <h3 className="text-2xl font-semibold text-slate-700">Contract</h3>
      <ContractDetails contract={contract} otherContact={otherContact} />
      <AddTransaction contract={contract} otherContact={otherContact} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}
