"use client";

import { useCallback, useState } from "react";

import { COLLAPSED_WIDTH, MIN_COLUMN_WIDTH } from "../constants";

/**
 * Handles mouse-driven resizing of adjacent grid columns.
 */
// eslint-disable-next-line max-lines-per-function
export default function useGridColumnResizeDrag(
  columnCount: number,
  visibility: boolean[],
  setStoredSizes: React.Dispatch<React.SetStateAction<number[] | undefined>>,
  setSizes: React.Dispatch<React.SetStateAction<number[]>>,
  defaultValue: number[]
) {
  const [isResizing, setIsResizing] = useState(false);

  const startResize = useCallback(
    (index: number, startWidth: number, nextStartWidth: number, startEvent: React.MouseEvent) => {
      const startX = startEvent.clientX;
      setIsResizing(true);

      function onMouseMove(e: MouseEvent) {
        // Calculate how far the mouse has moved since the drag started.
        let delta = e.clientX - startX;
        let newWidth = startWidth + delta;
        let newNextWidth = nextStartWidth - delta;

        // Respect minimum widths depending on column visibility.
        const minCurrent = visibility[index] ? MIN_COLUMN_WIDTH : COLLAPSED_WIDTH;
        const minNext = visibility[index + 1] ? MIN_COLUMN_WIDTH : COLLAPSED_WIDTH;

        if (newWidth < minCurrent) {
          newWidth = minCurrent;
          delta = newWidth - startWidth;
          newNextWidth = nextStartWidth - delta;
        }

        if (newNextWidth < minNext) {
          newNextWidth = minNext;
          delta = nextStartWidth - newNextWidth;
          newWidth = startWidth + delta;
        }

        // Persist new widths and update live sizes simultaneously.
        setStoredSizes((prev = defaultValue) => {
          const next = [
            ...prev,
            ...Array.from({ length: Math.max(columnCount - prev.length, 0) }).fill(0),
          ].slice(0, columnCount) as number[];
          next[index] = newWidth;
          if (index + 1 < columnCount) {
            next[index + 1] = newNextWidth;
          }
          return next;
        });

        setSizes((prev = defaultValue) => {
          const next = [
            ...prev,
            ...Array.from({ length: Math.max(columnCount - prev.length, 0) }).fill(0),
          ].slice(0, columnCount) as number[];
          next[index] = newWidth;
          if (index + 1 < columnCount) {
            next[index + 1] = newNextWidth;
          }
          return next;
        });
      }

      function onMouseUp() {
        globalThis.removeEventListener("mousemove", onMouseMove);
        globalThis.removeEventListener("mouseup", onMouseUp);
        setIsResizing(false);
      }

      globalThis.addEventListener("mousemove", onMouseMove);
      globalThis.addEventListener("mouseup", onMouseUp);
    },
    [setStoredSizes, setSizes, columnCount, defaultValue, visibility]
  );

  return { startResize, isResizing } as const;
}
