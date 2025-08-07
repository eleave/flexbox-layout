"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useLocalStorageState } from "ahooks";

import { COLLAPSED_WIDTH, MIN_COLUMN_WIDTH } from "../constants";

/**
 * Tracks and persists grid column widths while responding to visibility
 * changes and window resizing.
 */

// eslint-disable-next-line max-lines-per-function
export default function useGridColumnWidths(
  name: string,
  columnCount: number,
  visibility: boolean[]
) {
  // Determine equal width for columns that are currently visible.
  const collapsedCount = visibility.filter((v) => !v).length;
  const availableWidth =
    columnCount - collapsedCount > 0
      ? (globalThis.innerWidth - COLLAPSED_WIDTH * collapsedCount) / (columnCount - collapsedCount)
      : 0;
  const defaultValue = Array.from({ length: columnCount }).fill(availableWidth) as number[];

  // Persist widths so they survive page reloads.
  const [storedSizes = defaultValue, setStoredSizes] = useLocalStorageState<number[]>(
    `grid-sizes:${name}`,
    {
      defaultValue,
    }
  );

  // Apply collapsed width to hidden columns while keeping stored values.
  const [sizes, setSizes] = useState<number[]>(
    storedSizes.map((w, i) => (visibility[i] ? w : COLLAPSED_WIDTH))
  );

  const prevVisibility = useRef<boolean[]>(visibility);
  // Remember original widths so they can be restored when a column expands.
  const collapsedWidths = useRef<Record<number, number>>({});

  // Helper function to find the next visible column
  const findNextVisibleColumn = useCallback(
    (startIndex: number, direction: "forward" | "backward" = "forward") => {
      if (direction === "forward") {
        for (let i = startIndex + 1; i < columnCount; i++) {
          if (visibility[i]) {
            return i;
          }
        }
        // If no visible column found forward, search backward
        for (let i = startIndex - 1; i >= 0; i--) {
          if (visibility[i]) {
            return i;
          }
        }
      } else {
        for (let i = startIndex - 1; i >= 0; i--) {
          if (visibility[i]) {
            return i;
          }
        }
        // If no visible column found backward, search forward
        for (let i = startIndex + 1; i < columnCount; i++) {
          if (visibility[i]) {
            return i;
          }
        }
      }
      return -1; // No visible column found
    },
    [columnCount, visibility]
  );

  // When visibility changes, redistribute space and remember original sizes.
  useLayoutEffect(() => {
    const prev = prevVisibility.current;
    const nextStored = [...storedSizes];
    let updated = false;

    for (let i = 0; i < columnCount; i++) {
      if (prev[i] !== visibility[i]) {
        updated = true;

        if (visibility[i]) {
          // Expanding: restore previous width and reclaim space from a visible neighbor.
          const original = collapsedWidths.current[i] ?? availableWidth;
          const restored = Math.max(original, MIN_COLUMN_WIDTH);
          const freed = restored - COLLAPSED_WIDTH;
          nextStored[i] = restored;

          // Find a visible neighbor to reclaim space from
          const neighbor = findNextVisibleColumn(i);
          if (neighbor >= 0 && neighbor < nextStored.length) {
            const currentNeighborWidth = nextStored[neighbor] ?? 0;
            nextStored[neighbor] = Math.max(currentNeighborWidth - freed, MIN_COLUMN_WIDTH);
          }
          delete collapsedWidths.current[i];
        } else {
          // Collapsing: store original width and give excess space to a visible neighbor.
          const original = nextStored[i] ?? 0;
          collapsedWidths.current[i] = original;
          const freed = original - COLLAPSED_WIDTH;
          nextStored[i] = COLLAPSED_WIDTH;

          // Find a visible neighbor to give space to
          const neighbor = findNextVisibleColumn(i);
          if (neighbor >= 0 && neighbor < nextStored.length) {
            const currentNeighborWidth = nextStored[neighbor] ?? 0;
            nextStored[neighbor] = currentNeighborWidth + freed;
          }
        }
      }
    }

    prevVisibility.current = [...visibility];
    if (updated) {
      setStoredSizes(nextStored);
    }
  }, [visibility, storedSizes, columnCount, setStoredSizes, availableWidth, findNextVisibleColumn]);

  // Sync state with stored sizes whenever visibility changes.
  useEffect(() => {
    setSizes(storedSizes.map((w, i) => (visibility[i] ? w : COLLAPSED_WIDTH)));
  }, [storedSizes, visibility]);

  // Ensure stored array length matches current column count.
  useEffect(() => {
    setStoredSizes((prev = defaultValue) => {
      const next = [
        ...prev,
        ...Array.from({ length: Math.max(columnCount - prev.length, 0) }).fill(availableWidth),
      ].slice(0, columnCount) as number[];
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnCount, setStoredSizes]);

  // Scale widths proportionally when the available window size changes.
  const scaleToWindow = useCallback(() => {
    setStoredSizes((prev = defaultValue) => {
      const collapsedCount = visibility.filter((v) => !v).length;
      const prevVisibleTotal = prev.reduce((sum, w, i) => sum + (visibility[i] ? w : 0), 0);
      const nextVisibleTotal = globalThis.innerWidth - COLLAPSED_WIDTH * collapsedCount;
      if (prevVisibleTotal <= 0 || prevVisibleTotal === nextVisibleTotal) {
        return prev;
      }
      const scale = nextVisibleTotal / prevVisibleTotal;
      const next = [...prev];
      for (let i = 0; i < columnCount; i++) {
        if (visibility[i]) {
          next[i] = (prev[i] ?? 0) * scale;
        } else {
          // Keep track of original width for collapsed columns while scaling.
          const currentCollapsedWidth = collapsedWidths.current[i] ?? prev[i] ?? 0;
          collapsedWidths.current[i] = currentCollapsedWidth * scale;
          next[i] = COLLAPSED_WIDTH;
        }
      }
      return next;
    });
  }, [columnCount, visibility, setStoredSizes, defaultValue]);

  // Initialize widths based on the current window size.
  useEffect(() => {
    scaleToWindow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced handler to rescale widths when the window is resized.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function onResize() {
      clearTimeout(timeout);
      timeout = globalThis.setTimeout(scaleToWindow, 100);
    }

    globalThis.addEventListener("resize", onResize);
    return () => {
      globalThis.removeEventListener("resize", onResize);
      clearTimeout(timeout);
    };
  }, [scaleToWindow]);

  return { sizes, setSizes, setStoredSizes, defaultValue } as const;
}
