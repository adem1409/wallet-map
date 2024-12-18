import AddTransaction from "@/components/app/debt-manager/[id]/AddTransaction";
import ContractDetails from "./ContractDetails";
import TransactionsList from "./TransactionsList";

export default async function Contract({ contract, transactions }) {
  return (
    <div className="pt-2 pl-4 pb-20">
      <h3 className="text-2xl font-semibold text-slate-700">Contract</h3>
      <ContractDetails contract={contract} />
      <AddTransaction contract={contract} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}
