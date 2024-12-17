"use client";

function TransactionsList({ transactions }) {
  console.log(transactions);
  return (
    <div className="mt-4 bg-white border border-slate-200 rounded-lg py-6 px-3">
      <h2 className="text-lg font-semibold">Transactions</h2>
    </div>
  );
}

export default TransactionsList;
