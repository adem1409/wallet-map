"use client";
import DebtManager from "@/components/app/debt-manager/DebtManager";
import { useAuthContext } from "@/contexts/AuthProvider";

function Page() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <div className="pt-2 pl-4 pb-20">
      <DebtManager />
    </div>
  );
}

export default Page;
