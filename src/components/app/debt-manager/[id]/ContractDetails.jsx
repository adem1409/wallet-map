import { useAuthContext } from "@/contexts/AuthProvider";
import Image from "next/image";
import { useMemo } from "react";

function ContractDetails({ contract, userSide, otherUserSide }) {
  const { user } = useAuthContext();

  const otherUser = useMemo(() => contract[otherUserSide], [otherUserSide]);

  return (
    <section className="flex gap-10 mt-4 bg-white border border-slate-200 rounded-lg py-2 px-3">
      <article className="">
        <h2 className="text-lg font-semibold">Contract #{contract.id}</h2>
        <div className="block w-fit mt-2 rounded-lg duration-200">
          <div className="flex gap-2 items-center">
            <div className="flex flex-col items-center">
              <div className="relative w-[80px] aspect-square rounded-full border-2 border-slate-400 overflow-hidden">
                <Image src={`${process.env.NEXT_PUBLIC_API_URL}${user?.picture || ""}`} fill className="" sizes="100px" alt="" />
              </div>
              <p className="font-medium text-sm text-slate-700">You</p>
            </div>
            <div className="mx-16"></div>
            <div className="flex flex-col items-center">
              <div className="relative w-[80px] aspect-square rounded-full border-2 border-slate-400 overflow-hidden">
                <Image src={`${process.env.NEXT_PUBLIC_API_URL}${otherUser?.picture || ""}`} fill className="" sizes="100px" alt="" />
              </div>
              <p className="font-medium text-sm text-slate-700">{otherUser?.username || otherUser.name}</p>
            </div>
          </div>
          <div className="">
            <p className={`font-semibold text-sm text-center ${contract.netBalance >= 0 ? "text-green-600" : "text-red-500"}`}>
              {contract.netBalance.toFixed(2)} {contract.currency}
            </p>
            <div className="flex rounded overflow-hidden">
              <div className={`${contract.netBalance > 0 ? "w-2/3" : contract.netBalance < 0 ? "w-1/3" : "grow"} h-3 bg-green-700`}></div>
              <div className="grow h-3 bg-red-500"></div>
            </div>
          </div>
        </div>
      </article>
      <article className="mt-9">
        <div className="flex gap-2 items-center">
          <FileIcon className="w-6 h-6" />
          <h2 className="font-bold">{contract.name}</h2>
        </div>
        <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <p className="font-bold text-sm">Currency:</p>
          <div className="flex items-center gap-2">
            <Image src={`/flags/${contract.currency}.png`} alt={`${contract.currency}.png`} width={20} height={20} />
            <p className="text-sm font-medium text-gray">{contract.currency}</p>
          </div>
          <p className="font-bold text-sm">Created At:</p>
          <p className="text-sm font-medium text-gray">
            {new Date(contract.createdAt).toLocaleDateString("en-UK", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="font-bold text-sm">Transactions:</p>
          <p className="text-sm font-medium text-gray">{contract.nbTransactions}</p>
        </div>
      </article>
    </section>
  );
}

export default ContractDetails;

const FileIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
    <path d="M8 7L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 11L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
