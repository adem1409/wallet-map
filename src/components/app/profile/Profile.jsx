import Picture from "@/components/app/profile/Picture";
import UserInfo from "./UserInfo";

export default function Profile() {
  return (
    <div className="max-w-[700px]">
      <Picture />
      <UserInfo />
    </div>
  );
}
