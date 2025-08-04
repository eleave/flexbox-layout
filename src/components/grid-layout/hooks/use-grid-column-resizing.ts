import React, { useCallback } from "react";
import { useLocalStorageState } from "ahooks";

const MIN_COLUMN_WIDTH = 200;

export default function useGridColumnResizing(
  name: string,
  columnCount: number
) {
  const defaultValue = Array(columnCount).fill(0);

  const [sizes = defaultValue, setSizes] = useLocalStorageState<number[]>(
    `grid-sizes:${name}`,
    { defaultValue }
  );

  const startResize = useCallback(
    (
      index: number,
      startWidth: number,
      nextStartWidth: number,
      startEvent: React.MouseEvent
    ) => {
      const startX = startEvent.clientX;

      function onMouseMove(e: MouseEvent) {
        let delta = e.clientX - startX;
        let newWidth = startWidth + delta;
        let newNextWidth = nextStartWidth - delta;

        if (newWidth < MIN_COLUMN_WIDTH) {
          newWidth = MIN_COLUMN_WIDTH;
          delta = newWidth - startWidth;
          newNextWidth = nextStartWidth - delta;
        }

        if (newNextWidth < MIN_COLUMN_WIDTH) {
          newNextWidth = MIN_COLUMN_WIDTH;
          delta = nextStartWidth - newNextWidth;
          newWidth = startWidth + delta;
        }

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
      }

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [setSizes, columnCount, defaultValue]
  );

  return [sizes, startResize] as const;
}

