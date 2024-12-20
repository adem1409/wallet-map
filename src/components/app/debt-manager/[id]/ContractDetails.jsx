import { useMemo } from "react";

function ContractDetails({ contract, userSide, otherUserSide }) {
  const otherUser = useMemo(() => contract[otherUserSide], [otherUserSide]);

  return (
    <div className="mt-4 bg-white border border-slate-200 rounded-lg py-6 px-3">
      <h2 className="text-lg font-semibold">Contract</h2>
      <div>Contract #{contract.id}</div>
      <div></div>
    </div>
  );
}

export default ContractDetails;
