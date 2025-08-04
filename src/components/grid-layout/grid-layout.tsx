"use client";

import React, { useRef } from "react";
import useGridColumnVisibility from "./hooks/use-grid-column-visibility";
import useGridColumnResizing from "./hooks/use-grid-column-resizing";
import type { GridColumn, GridColumnProps } from "./grid-column";

interface GridLayoutProps {
  children: [
    React.ReactElement<GridColumnProps, typeof GridColumn>,
    React.ReactElement<GridColumnProps, typeof GridColumn>,
    React.ReactElement<GridColumnProps, typeof GridColumn>,
    ...React.ReactElement<GridColumnProps, typeof GridColumn>[]
  ];
  height?: string;
  name: string;
  scrollable?: boolean; // allow extra prop used elsewhere
}

export function GridLayout({ children, name, height = "100vh" }: GridLayoutProps) {
  const childArray = React.Children.toArray(children) as React.ReactElement<
    GridColumnProps,
    typeof GridColumn
  >[];
  const columnCount = childArray.length;
  if (columnCount < 3) {
    throw new Error("GridLayout requires at least three GridColumn children");
  }
  const [visibility, toggle] = useGridColumnVisibility(name, columnCount);
  const [widths, startResize] = useGridColumnResizing(name, columnCount);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const templateColumns = widths
    .map((w) => (w ? `${w}px` : "1fr"))
    .slice(0, columnCount)
    .join(" ");

  return (
    <div
      className="grid w-full"
      style={{
        height,
        gridTemplateColumns: templateColumns,
      }}
    >
      {childArray.map((child, index) => {
        const isLast = index === columnCount - 1;
        const isFirst = index === 0;
        return React.cloneElement(
          child,
          {
            key: index,
            ref: (el: HTMLDivElement | null) => (columnRefs.current[index] = el),
            className: `${child.props.className ?? ""} relative h-full`,
            isLast,
            isFirst,
            collapsed: !visibility[index],
            onToggle: () => toggle(index),
            showResizer: !isLast,
            onResizeStart: (e: React.MouseEvent) => {
              const startWidth = columnRefs.current[index]?.getBoundingClientRect().width || 0;
              startResize(index, startWidth, e);
            },
          },
          child.props.children
        );
      })}
    </div>
  );
}
