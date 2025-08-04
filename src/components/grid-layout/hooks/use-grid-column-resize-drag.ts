"use client";

import React, { useCallback, useState } from "react";
import { COLLAPSED_WIDTH, MIN_COLUMN_WIDTH } from "./constants";

export default function useGridColumnResizeDrag(
  columnCount: number,
  visibility: boolean[],
  setStoredSizes: React.Dispatch<React.SetStateAction<number[] | undefined>>,
  setSizes: React.Dispatch<React.SetStateAction<number[]>>,
  defaultValue: number[]
) {
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
    [setStoredSizes, setSizes, columnCount, defaultValue, visibility]
  );

  return { startResize, isResizing } as const;
}
