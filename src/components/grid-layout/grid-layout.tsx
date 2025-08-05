"use client";

import React, { useRef } from "react";
import useGridColumnVisibility from "./hooks/use-grid-column-visibility";
import useGridColumnResizing from "./hooks/use-grid-column-resizing";
import { GridColumn } from "./grid-column";
import { GridColumnBase } from "./grid-column-base";
import type { GridColumnPublicProps } from "./types";
import { cn } from "@/utils";

interface GridLayoutProps {
  children: React.ReactElement<GridColumnPublicProps, typeof GridColumn>[];
  height?: string;
  name: string;
  scrollable?: boolean; // allow extra prop used elsewhere
}

export function GridLayout({ children, name, height = "100vh" }: GridLayoutProps) {
  const childArray = React.Children.toArray(children) as React.ReactElement<
    GridColumnPublicProps,
    typeof GridColumn
  >[];
  const columnCount = childArray.length;
  if (columnCount < 3) {
    throw new Error("GridLayout requires at least three GridColumn children");
  }
  const [visibility, toggle] = useGridColumnVisibility(name, columnCount);
  const [widths, startResize, isResizing] = useGridColumnResizing(name, columnCount, visibility);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const templateColumns = widths
    .map((w) => (w ? `${w}px` : "1fr"))
    .slice(0, columnCount)
    .join(" ");

  return (
    <div
      className={cn(
        "grid w-full",
        !isResizing && "transition-[grid-template-columns] duration-300"
      )}
      style={{
        height,
        gridTemplateColumns: templateColumns,
      }}
    >
      {childArray.map((child, index) => {
        const isLast = index === columnCount - 1;
        const isFirst = index === 0;
        return (
          <GridColumnBase
            key={index}
            ref={(el: HTMLDivElement | null) => {
              columnRefs.current[index] = el;
            }}
            {...child.props}
            className={`${child.props.className ?? ""} relative h-full`}
            isLast={isLast}
            isFirst={isFirst}
            isCollapsed={!visibility[index]}
            onToggle={() => toggle(index)}
            showResizer={!isLast && visibility[index] && visibility[index + 1]}
            isResizing={isResizing}
            onResizeStart={(e: React.MouseEvent) => {
              const startWidth = columnRefs.current[index]?.getBoundingClientRect().width || 0;
              const nextStartWidth =
                columnRefs.current[index + 1]?.getBoundingClientRect().width || 0;
              startResize(index, startWidth, nextStartWidth, e);
            }}
          >
            {child.props.children}
          </GridColumnBase>
        );
      })}
    </div>
  );
}
