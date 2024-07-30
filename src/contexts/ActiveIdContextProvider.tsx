"use client";
import { useActiveId } from "@/lib/hook";
import { createContext } from "react";

type ActiveIdContextType = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();
  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  );
}
