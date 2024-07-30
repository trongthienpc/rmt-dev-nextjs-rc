"use client";
import { useJobItemsContext } from "@/lib/hook";
import React from "react";

const ResultCount = () => {
  const { totalNumberOfResults } = useJobItemsContext();
  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfResults}</span>
    </p>
  );
};

export default ResultCount;
