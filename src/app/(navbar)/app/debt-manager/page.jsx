import DebtManager from "@/components/app/debt-manager/DebtManager";
import axios from "axios";
import { cookies } from "next/headers";

export default async function page() {
  let contracts = null;

  try {
    const res = await axios.get("/api/contracts", {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    contracts = res.data;
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="pt-2 pl-4 pb-20">
      <DebtManager contracts={contracts} />
    </div>
  );
}
