function ContractDetails({ contract }) {
  const { id, netBalance, currency, status, sideBShared, sideBLocal, sideA } =
    contract;
  console.log(sideBShared);
  console.log(sideBLocal);
  console.log(sideA);

  return (
    <div className="mt-4 bg-white border border-slate-200 rounded-lg py-6 px-3">
      <h2 className="text-lg font-semibold">Contract</h2>
      <div>
        Contract #{id} {status}
      </div>
      <div>
        {netBalance} {currency} to {sideBShared.username}
      </div>
    </div>
  );
}

export default ContractDetails;
