"use client";
import { useJobItemsContext } from "@/lib/hook";
import React from "react";
import JobList from "./JobList";

const JobListSearch = () => {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();
  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
};

export default JobListSearch;
