import { useActiveId } from "@/lib/hook";
import { JobItem } from "@/lib/types";
import { LoaderCircle } from "lucide-react";
import React from "react";
import JobListItem from "./JobListItem";
type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

const JobList = ({ jobItems, isLoading }: JobListProps) => {
  const activeId = useActiveId();

  return (
    <ul>
      {isLoading && <LoaderCircle className="animate-spin w-5 h-5" />}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
};

export default JobList;
