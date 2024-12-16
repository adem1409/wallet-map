"use client";
import ContractsList from "@/components/app/debt-manager/ContractsList";
import React, { useState } from "react";

export default function Contracts({ contracts: initialContracts }) {
  const [contracts, setContracts] = useState(initialContracts);

  return (
    <div className="">
      <ContractsList contracts={contracts} />
    </div>
  );
}
