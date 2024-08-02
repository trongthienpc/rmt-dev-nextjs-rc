"use client";
import { SearchTextContext } from "@/contexts/SearchTextContextProvider";
import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { handleError } from "./utils";
import { JobItemsContext } from "@/contexts/JobItemsContextProvider";
import { BookmarksContext } from "@/contexts/BookmarksContextProvider";
import { ActiveIdContext } from "@/contexts/ActiveIdContextProvider";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timeId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeId);
  }, [value, delay]);

  return debouncedValue;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within a SearchTextContextProvider"
    );
  }

  return context;
}

export function useActiveId() {
  const [activeId, setActiveId] = React.useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      console.log("🚀 ~ handleHashChange ~ id:", id);
      setActiveId(id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    }
  }, [key]);

  return [storedValue, setValue];
}

export function useJobItem(id: number | null) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => (id ? fetchJobItem(id) : null),
    staleTime: 1000 * 60 * 60,
    retry: false,
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });
  if (isError) {
    handleError(error);
    return { isLoading, jobItem: null };
  }
  const jobItem = data?.jobItem;
  return { isLoading, jobItem };
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => Boolean(jobItem)) as JobItemExpanded[];
  const isLoading = results.some((result) => result.isLoading);

  return {
    jobItems,
    isLoading,
  };
}

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  const data = await response.json();
  return data;
};

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
};

export function useSearchQuery(searchText: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => fetchJobItems(searchText),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(searchText),
  });

  if (isError) {
    handleError(error);
    return { jobItems: [], isLoading };
  }

  return { jobItems: data?.jobItems, isLoading };
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error(
      "useJobItemsContext must be used within a JobItemsContextProvider"
    );
  }

  return context;
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksContextProvider"
    );
  }

  return context;
}

export function useActiveIdsContext() {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error(
      "useActiveIdsContext must be used within a ActiveIdContextProvider"
    );
  }

  return context;
}
