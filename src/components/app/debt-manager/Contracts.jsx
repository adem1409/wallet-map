"use client";
import ContractsList from "@/components/app/debt-manager/ContractsList";
import axios from "axios";
import React, { useState } from "react";

export default function Contracts({ contracts: initialContracts }) {
  const [contracts, setContracts] = useState(initialContracts);

  async function fetchContracts() {
    try {
      const res = await axios.get("/api/contracts");

      setContracts(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      <ContractsList contracts={contracts} fetchContracts={fetchContracts} />
    </div>
  );
}
