"use client";

import useGridColumnWidths from "./use-grid-column-widths";
import useGridColumnResizeDrag from "./use-grid-column-resize-drag";

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
  const { sizes, setSizes, setStoredSizes, defaultValue } =
    useGridColumnWidths(name, columnCount, visibility);

  // Wire up drag logic to mutate the stored and rendered widths.
  const { startResize, isResizing } = useGridColumnResizeDrag(
    columnCount,
    visibility,
    setStoredSizes,
    setSizes,
    defaultValue
  );

  return [sizes, startResize, isResizing] as const;
}
