"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorageState } from "ahooks";
import { COLLAPSED_WIDTH, MIN_COLUMN_WIDTH } from "./constants";

export default function useGridColumnWidths(
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

  const [storedSizes = defaultValue, setStoredSizes] =
    useLocalStorageState<number[]>(`grid-sizes:${name}`, {
      defaultValue,
    });

  const [sizes, setSizes] = useState<number[]>(
    storedSizes.map((w, i) => (visibility[i] ? w : COLLAPSED_WIDTH))
  );

  const prevVisibility = useRef<boolean[]>(visibility);
  const collapsedWidths = useRef<Record<number, number>>({});

  useEffect(() => {
    const prev = prevVisibility.current;
    const nextStored = [...storedSizes];
    let updated = false;

    for (let i = 0; i < columnCount; i++) {
      if (prev[i] !== visibility[i]) {
        updated = true;
        const neighbor = i < columnCount - 1 ? i + 1 : i - 1;

        if (!visibility[i]) {
          const original = nextStored[i];
          collapsedWidths.current[i] = original;
          const freed = original - COLLAPSED_WIDTH;
          nextStored[i] = COLLAPSED_WIDTH;
          if (neighbor >= 0) nextStored[neighbor] += freed;
        } else {
          const original = collapsedWidths.current[i] ?? availableWidth;
          const restored = Math.max(original, MIN_COLUMN_WIDTH);
          const freed = restored - COLLAPSED_WIDTH;
          nextStored[i] = restored;
          if (neighbor >= 0) {
            const neighborMin = visibility[neighbor]
              ? MIN_COLUMN_WIDTH
              : COLLAPSED_WIDTH;
            nextStored[neighbor] = Math.max(
              nextStored[neighbor] - freed,
              neighborMin
            );
          }
          delete collapsedWidths.current[i];
        }
      }
    }

    prevVisibility.current = [...visibility];
    if (updated) setStoredSizes(nextStored);
  }, [visibility, storedSizes, columnCount, setStoredSizes, availableWidth]);

  useEffect(() => {
    setSizes(storedSizes.map((w, i) => (visibility[i] ? w : COLLAPSED_WIDTH)));
  }, [storedSizes, visibility]);

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

  const scaleToWindow = useCallback(() => {
    setStoredSizes((prev = defaultValue) => {
      const collapsedCount = visibility.filter((v) => !v).length;
      const prevVisibleTotal = prev.reduce(
        (sum, w, i) => sum + (visibility[i] ? w : 0),
        0
      );
      const nextVisibleTotal =
        window.innerWidth - COLLAPSED_WIDTH * collapsedCount;
      if (prevVisibleTotal <= 0 || prevVisibleTotal === nextVisibleTotal) {
        return prev;
      }
      const scale = nextVisibleTotal / prevVisibleTotal;
      const next = [...prev];
      for (let i = 0; i < columnCount; i++) {
        if (visibility[i]) {
          next[i] = prev[i] * scale;
        } else {
          collapsedWidths.current[i] =
            (collapsedWidths.current[i] ?? prev[i]) * scale;
          next[i] = COLLAPSED_WIDTH;
        }
      }
      return next;
    });
  }, [columnCount, visibility, setStoredSizes, defaultValue]);

  useEffect(() => {
    scaleToWindow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeout: number;

    function onResize() {
      clearTimeout(timeout);
      timeout = window.setTimeout(scaleToWindow, 100);
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timeout);
    };
  }, [scaleToWindow]);

  return { sizes, setSizes, setStoredSizes, defaultValue } as const;
}
