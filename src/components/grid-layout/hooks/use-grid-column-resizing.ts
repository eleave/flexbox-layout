"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorageState } from "ahooks";

const MIN_COLUMN_WIDTH = 200;
const COLLAPSED_WIDTH = 44;

export default function useGridColumnResizing(
  name: string,
  columnCount: number,
  visibility: boolean[]
) {
  // Determine how much horizontal space remains after accounting for collapsed columns
  const collapsedCount = visibility.filter((v) => !v).length;
  const availableWidth =
    columnCount - collapsedCount > 0
      ? (window.innerWidth - COLLAPSED_WIDTH * collapsedCount) /
        (columnCount - collapsedCount)
      : 0;
  // Default widths for each column, used on first render or when storage is empty
  const defaultValue = Array(columnCount).fill(availableWidth);

  const [storedSizes = defaultValue, setStoredSizes] = useLocalStorageState<number[]>(
    `grid-sizes:${name}`,
    {
      defaultValue,
    }
  );
  // Active widths of the grid: collapsed columns use COLLAPSED_WIDTH, others use stored sizes
  const [sizes, setSizes] = useState<number[]>(
    storedSizes.map((w, i) => (visibility[i] ? w : COLLAPSED_WIDTH))
  );

  // Keep active widths in sync when visibility or stored sizes change
  useEffect(() => {
    setSizes(storedSizes.map((w, i) => (visibility[i] ? w : COLLAPSED_WIDTH)));
  }, [storedSizes, visibility]);

  // Ensure the stored sizes array always matches the current column count
  useEffect(() => {
    setStoredSizes((prev = defaultValue) => {
      const next = [
        ...prev,
        ...Array(Math.max(columnCount - prev.length, 0)).fill(availableWidth),
      ].slice(0, columnCount);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnCount, setStoredSizes]);

  const [isResizing, setIsResizing] = useState(false);

  const startResize = useCallback(
    (
      index: number,
      startWidth: number,
      nextStartWidth: number,
      startEvent: React.MouseEvent
    ) => {
      const startX = startEvent.clientX;
      setIsResizing(true);

      function onMouseMove(e: MouseEvent) {
        let delta = e.clientX - startX;
        let newWidth = startWidth + delta;
        let newNextWidth = nextStartWidth - delta;

        // Determine the minimum width each column is allowed to shrink to
        const minCurrent = visibility[index] ? MIN_COLUMN_WIDTH : COLLAPSED_WIDTH;
        const minNext = visibility[index + 1] ? MIN_COLUMN_WIDTH : COLLAPSED_WIDTH;

        // Ensure the current column respects its minimum width
        if (newWidth < minCurrent) {
          newWidth = minCurrent;
          delta = newWidth - startWidth;
          newNextWidth = nextStartWidth - delta;
        }

        // Ensure the adjacent column also respects its minimum width
        if (newNextWidth < minNext) {
          newNextWidth = minNext;
          delta = nextStartWidth - newNextWidth;
          newWidth = startWidth + delta;
        }

        // Persist updated sizes in local storage so they survive toggles
        setStoredSizes((prev = defaultValue) => {
          const next = [
            ...prev,
            ...Array(Math.max(columnCount - prev.length, 0)).fill(0),
          ].slice(0, columnCount);
          next[index] = newWidth;
          if (index + 1 < columnCount) {
            next[index + 1] = newNextWidth;
          }
          return next;
        });

        // Reflect the drag in the current render state
        setSizes((prev = defaultValue) => {
          const next = [
            ...prev,
            ...Array(Math.max(columnCount - prev.length, 0)).fill(0),
          ].slice(0, columnCount);
          next[index] = newWidth;
          if (index + 1 < columnCount) {
            next[index + 1] = newNextWidth;
          }
          return next;
        });
      }

      function onMouseUp() {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        setIsResizing(false);
      }

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [
      setStoredSizes,
      setSizes,
      columnCount,
      defaultValue,
      visibility,
    ]
  );

  return [sizes, startResize, isResizing] as const;
}
