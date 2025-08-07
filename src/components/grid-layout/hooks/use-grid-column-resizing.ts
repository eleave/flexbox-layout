"use client";

import { useCallback } from "react";

import useGridColumnResizeDrag from "./use-grid-column-resize-drag";
import useGridColumnWidths from "./use-grid-column-widths";

/**
 * Provides grid column widths along with drag handlers for interactive
 * resizing.
 */
export default function useGridColumnResizing(
  name: string,
  columnCount: number,
  visibility: boolean[]
) {
  // Persist widths and keep them in sync with visibility changes.
  const { sizes, setSizes, setStoredSizes, defaultValue } = useGridColumnWidths(
    name,
    columnCount,
    visibility
  );

  // Create a wrapper for setStoredSizes that ensures type compatibility
  const safeSetStoredSizes = useCallback(
    (value: React.SetStateAction<number[] | undefined>) => {
      if (typeof value === "function") {
        setStoredSizes((prev) => {
          const result = value(prev);
          return result ?? defaultValue;
        });
      } else {
        setStoredSizes(value ?? defaultValue);
      }
    },
    [setStoredSizes, defaultValue]
  );

  // Wire up drag logic to mutate the stored and rendered widths.
  const { startResize, isResizing } = useGridColumnResizeDrag(
    columnCount,
    visibility,
    safeSetStoredSizes,
    setSizes,
    defaultValue
  );

  return [sizes, startResize, isResizing] as const;
}
