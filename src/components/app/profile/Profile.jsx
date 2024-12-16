import Picture from "@/components/app/profile/Picture";
import UserInfo from "./UserInfo";

export default function Profile() {
  return (
    <div className="max-w-[700px]">
      <h3 className="text-2xl font-semibold text-slate-700">Profile</h3>
      <div className="mt-4 bg-white border border-slate-200 rounded-lg py-6 px-3">
        <Picture />
        <UserInfo />
      </div>
    </div>
  );
}
