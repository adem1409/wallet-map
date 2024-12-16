import ContractsList from "@/components/app/debt-manager/ContractsList";
import React from "react";

export default function Contracts() {
  return (
    <div className="">
      <ContractsList contracts={contracts} />
    </div>
  );
}

const contracts = [
  {
    name: "10 React Best practices",
    date: "April 3rd 2023",
    time: "06:32 PM",
    icon: "document", // Can use any custom logic for icons
  },
  {
    name: "Cowboy house riding on the moon",
    date: "April 3rd 2023",
    time: "06:32 PM",
    icon: "document",
  },
  {
    name: "Write a useEffect function with clean up",
    date: "April 3rd 2023",
    time: "06:32 PM",
    icon: "code", // For code-related icons
  },
];
