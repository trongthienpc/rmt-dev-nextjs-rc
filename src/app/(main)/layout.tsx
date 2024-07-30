"use client";
import ActiveIdContextProvider from "@/contexts/ActiveIdContextProvider";
import BookmarksContextProvider from "@/contexts/BookmarksContextProvider";
import JobItemsContextProvider from "@/contexts/JobItemsContextProvider";
import SearchTextContextProvider from "@/contexts/SearchTextContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <ActiveIdContextProvider>
          <SearchTextContextProvider>
            <JobItemsContextProvider>{children}</JobItemsContextProvider>
          </SearchTextContextProvider>
        </ActiveIdContextProvider>
      </BookmarksContextProvider>
    </QueryClientProvider>
  );
};

export default layout;
