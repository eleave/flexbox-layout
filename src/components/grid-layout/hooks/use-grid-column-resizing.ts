"use client";

import useGridColumnWidths from "./use-grid-column-widths";
import useGridColumnResizeDrag from "./use-grid-column-resize-drag";

export default function useGridColumnResizing(
  name: string,
  columnCount: number,
  visibility: boolean[]
) {
  const { sizes, setSizes, setStoredSizes, defaultValue } =
    useGridColumnWidths(name, columnCount, visibility);

  const { startResize, isResizing } = useGridColumnResizeDrag(
    columnCount,
    visibility,
    setStoredSizes,
    setSizes,
    defaultValue
  );

  return [sizes, startResize, isResizing] as const;
}
