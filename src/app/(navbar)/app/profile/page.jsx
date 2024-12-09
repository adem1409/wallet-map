"use client";
import { useAuthContext } from "@/contexts/AuthProvider";

function Page() {
  const { user } = useAuthContext();
  console.log(user);

  return <div>Profile</div>;
}

export default Page;
