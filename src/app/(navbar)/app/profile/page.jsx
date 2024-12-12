"use client";
import Profile from "@/components/app/profile/Profile";
import { useAuthContext } from "@/contexts/AuthProvider";

function Page() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <div className="pt-2 px-4 pb-20 max-w-4xl">
      <Profile />
    </div>
  );
}

export default Page;
