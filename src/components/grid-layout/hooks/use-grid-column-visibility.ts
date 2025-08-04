import { useCallback } from "react";
import { useLocalStorageState } from "ahooks";

/**
 * Manages persisted visibility state for each grid column.
 */
export default function useGridColumnVisibility(
  name: string,
  columnCount: number
) {
  const defaultValue = Array(columnCount).fill(true);

  const [visibility = defaultValue, setVisibility] = useLocalStorageState<
    boolean[]
  >(`grid-visibility:${name}`, {
    defaultValue,
  });

  const toggle = useCallback(
    (index: number) => {
      setVisibility((prev = defaultValue) => {
        // Extend visibility array if column count grows before toggling.
        const next = [
          ...prev,
          ...Array(Math.max(columnCount - prev.length, 0)).fill(true),
        ].slice(0, columnCount);
        next[index] = !next[index];
        return next;
      });
    },
    [columnCount, setVisibility, defaultValue]
  );

  return [visibility, toggle] as const;
}
