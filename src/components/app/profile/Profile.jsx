import Picture from "@/components/app/profile/Picture";
import UserInfo from "./UserInfo";

export default function Profile() {
  return (
    <div className="max-w-[700px]">
      <h3 className="text-2xl font-bold">Profile</h3>
      <Picture />
      <UserInfo />
    </div>
  );
}
