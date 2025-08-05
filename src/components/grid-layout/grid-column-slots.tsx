"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";

export interface GridColumnSlotContextValue {
  setTitle: (node: ReactNode) => void;
  setActions: (node: ReactNode) => void;
  setTabs: (node: ReactNode) => void;
}

export const GridColumnSlotContext = createContext<GridColumnSlotContextValue>({
  setTitle: () => {},
  setActions: () => {},
  setTabs: () => {},
});

export function GridColumnTitle({ children }: { children: ReactNode }) {
  const { setTitle } = useContext(GridColumnSlotContext);
  useEffect(() => {
    setTitle(children);
  }, [children, setTitle]);
  return null;
}

export function GridColumnActions({ children }: { children: ReactNode }) {
  const { setActions } = useContext(GridColumnSlotContext);
  useEffect(() => {
    setActions(children);
  }, [children, setActions]);
  return null;
}

export function GridColumnTabs({ children }: { children: ReactNode }) {
  const { setTabs } = useContext(GridColumnSlotContext);
  useEffect(() => {
    setTabs(children);
  }, [children, setTabs]);
  return null;
}
