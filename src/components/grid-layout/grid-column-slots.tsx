"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";

export interface GridColumnSlotContextValue {
  setTitle: (node: ReactNode) => void;
  setActions: (node: ReactNode) => void;
  setTabs: (node: ReactNode) => void;
  setFooter: (node: ReactNode) => void;
}

export const GridColumnSlotContext = createContext<GridColumnSlotContextValue>({
  setTitle: () => {},
  setActions: () => {},
  setTabs: () => {},
  setFooter: () => {},
});

export function GridColumnTitle({ children }: { children: ReactNode }) {
  const { setTitle } = useContext(GridColumnSlotContext);
  useEffect(() => {
    setTitle(children);
    return () => setTitle(null);
  }, [children, setTitle]);
  return null;
}

export function GridColumnActions({ children }: { children: ReactNode }) {
  const { setActions } = useContext(GridColumnSlotContext);
  useEffect(() => {
    setActions(children);
    return () => setActions(null);
  }, [children, setActions]);
  return null;
}

export function GridColumnTabs({ children }: { children: ReactNode }) {
  const { setTabs } = useContext(GridColumnSlotContext);
  useEffect(() => {
    setTabs(children);
    return () => setTabs(null);
  }, [children, setTabs]);
  return null;
}

export function GridColumnFooter({ children }: { children?: ReactNode }) {
  const { setFooter } = useContext(GridColumnSlotContext);
  useEffect(() => {
    setFooter(children);
    return () => setFooter(null);
  }, [children, setFooter]);
  return null;
}
