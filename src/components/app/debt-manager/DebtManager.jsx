import Contracts from "@/components/app/debt-manager/Contracts";
import axios from "axios";

export default async function DebtManager() {
  let contracts = null;

  try {
    const res = await axios.get("/api/contracts");

    contracts = res.data;

    console.log("-------------------- contracts --------------------");
    console.log(contracts);
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="">
      <h3 className="text-2xl font-semibold text-slate-700">Debt Manager</h3>
      <Contracts contracts={contracts} />
    </div>
  );
}
