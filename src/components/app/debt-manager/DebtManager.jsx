import Contracts from "@/components/app/debt-manager/Contracts";
import axios from "axios";

export default async function DebtManager({ contracts }) {
  return (
    <div className="">
      <h3 className="text-2xl font-semibold text-slate-700">Debt Manager</h3>
      <Contracts contracts={contracts} />
    </div>
  );
}
