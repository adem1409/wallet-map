"use client";
import AddTransaction from "@/components/app/debt-manager/[id]/AddTransaction";
import ContractDetails from "./ContractDetails";
import TransactionsList from "./TransactionsList";
import { useMemo, useState } from "react";
import { useAuthContext } from "@/contexts/AuthProvider";
import axios from "@/config/axios";

export default function Contract({ contract, transactions: initialTransactions }) {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState(initialTransactions);

  async function fetchTransactions() {
    try {
      const res = await axios.get(`/api/contracts/${contract.id}/transactions`);

      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  }

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
      <div className="flex gap-4">
        <AddTransaction contract={contract} userSide={userSide} otherUserSide={otherUserSide} fetchTransactions={fetchTransactions} />
        <TransactionsList contract={contract} transactions={transactions} />
      </div>
    </div>
  );
}
