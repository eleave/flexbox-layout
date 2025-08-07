"use client";

import type { ReactNode } from "react";

export interface GridTabsProps {
  /** Inclusive starting column index (1-based) */
  start: number;
  /** Exclusive ending column index */
  end: number;
  /** Height of the tab bar in pixels. Defaults to HEADER_BLOCK_HEIGHT. */
  height?: number;
  /** Tab UI content */
  children: ReactNode;
}

// This component acts as a marker for layout-level tabs. It is rendered by GridLayout.
export function GridTabs(_props: GridTabsProps) {
  return null;
}

