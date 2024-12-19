import Contract from "@/components/app/debt-manager/[id]/Contract";
import axios from "@/config/axios";
import { cookies } from "next/headers";

export default async function page({ params }) {
  const { id } = params;
  let contract;
  let transactions;

  try {
    const cookieStore = cookies();
    const res = await axios.get(`/api/contracts/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    contract = res.data;
  } catch (error) {
    console.log("Error fetching contract data:", error.message);
  }

  try {
    const cookieStore = cookies();
    const res = await axios.get(`/api/contracts/${id}/transactions`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    transactions = res.data;
  } catch (error) {
    console.log("Error fetching transactions data:", error.message);
  }

  return (
    <div className="">
      <Contract contract={contract} transactions={transactions} />
    </div>
  );
}
