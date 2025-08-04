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
    (index: number, startWidth: number, startEvent: React.MouseEvent) => {
      const startX = startEvent.clientX;

      function onMouseMove(e: MouseEvent) {
        const delta = e.clientX - startX;
        const newWidth = Math.max(MIN_COLUMN_WIDTH, startWidth + delta);
        setSizes((prev = defaultValue) => {
          const next = [
            ...prev,
            ...Array(Math.max(columnCount - prev.length, 0)).fill(0),
          ].slice(0, columnCount);
          next[index] = newWidth;
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

