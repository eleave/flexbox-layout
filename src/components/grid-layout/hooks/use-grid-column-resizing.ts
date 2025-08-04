"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useLocalStorageState } from "ahooks";

const MIN_COLUMN_WIDTH = 200;
const COLLAPSED_WIDTH = 44;

export default function useGridColumnResizing(
  name: string,
  columnCount: number,
  visibility: boolean[]
) {
  const collapsedCount = visibility.filter((v) => !v).length;
  const availableWidth =
    columnCount - collapsedCount > 0
      ? (window.innerWidth - COLLAPSED_WIDTH * collapsedCount) /
        (columnCount - collapsedCount)
      : 0;
  const defaultValue = Array(columnCount).fill(availableWidth);
  visibility.forEach((v, i) => {
    if (!v) defaultValue[i] = COLLAPSED_WIDTH;
  });

  const [sizes = defaultValue, setSizes] = useLocalStorageState<number[]>(`grid-sizes:${name}`, {
    defaultValue,
  });

  // Skip recalculation on mount to preserve widths from localStorage
  const initialized = useRef(false);
  useLayoutEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    setSizes(() => {
      const collapsed = visibility.filter((v) => !v).length;
      const visibleCount = columnCount - collapsed;
      const visibleWidth =
        visibleCount > 0
          ? (window.innerWidth - COLLAPSED_WIDTH * collapsed) / visibleCount
          : 0;
      const next = Array(columnCount).fill(visibleWidth);
      visibility.forEach((v, i) => {
        if (!v) next[i] = COLLAPSED_WIDTH;
      });
      return next;
    });
  }, [visibility, columnCount, setSizes]);

  const [isResizing, setIsResizing] = useState(false);

  const startResize = useCallback(
    (index: number, startWidth: number, nextStartWidth: number, startEvent: React.MouseEvent) => {
      const startX = startEvent.clientX;
      setIsResizing(true);

      function onMouseMove(e: MouseEvent) {
        let delta = e.clientX - startX;
        let newWidth = startWidth + delta;
        let newNextWidth = nextStartWidth - delta;

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

        setSizes((prev = defaultValue) => {
          const next = [...prev, ...Array(Math.max(columnCount - prev.length, 0)).fill(0)].slice(
            0,
            columnCount
          );
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
    [setSizes, columnCount, defaultValue, visibility]
  );

  return [sizes, startResize, isResizing] as const;
}
