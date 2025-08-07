"use client";

import React, { Children, useRef } from "react";

import { cn } from "@ui/lib/utils";

import { GridColumn } from "./grid-column";
import { GridColumnBase } from "./grid-column-base";
import useGridColumnResizing from "./hooks/use-grid-column-resizing";
import useGridColumnVisibility from "./hooks/use-grid-column-visibility";
import type { GridColumnPublicProps } from "./types";
import type { GridTabsProps } from "./grid-tabs";
import { GridTabs } from "./grid-tabs";
import { BORDER_COLOR, HEADER_BLOCK_HEIGHT } from "./constants";

interface GridLayoutProps {
  children: React.ReactNode;
  height?: string;
  name: string;
  scrollable?: boolean; // allow extra prop used elsewhere
}

export function GridLayout({ children, name, height = "100vh" }: GridLayoutProps) {
  const childArray = Children.toArray(children) as Array<React.ReactElement>;

  const tabs = childArray.filter(
    (child) => child.type === GridTabs
  ) as Array<React.ReactElement<GridTabsProps, typeof GridTabs>>;

  const columns = childArray.filter(
    (child) => child.type === GridColumn
  ) as Array<React.ReactElement<GridColumnPublicProps, typeof GridColumn>>;

  const columnCount = columns.length;
  if (columnCount < 3) {
    throw new Error("GridLayout requires at least three GridColumn children");
  }
  const [visibility, toggle] = useGridColumnVisibility(name, columnCount);
  const [widths, startResize, isResizing] = useGridColumnResizing(name, columnCount, visibility);
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Determine tallest tab bar to reserve a top grid row when tabs are present
  const maxTabHeight = tabs.reduce(
    (max, tab) => Math.max(max, tab.props.height ?? HEADER_BLOCK_HEIGHT),
    0
  );

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
        ...(maxTabHeight > 0 && { gridTemplateRows: `${maxTabHeight}px 1fr` }),
      }}
    >
      {tabs.map((tab, index) => (
        <div
          key={`grid-tabs-${index}`}
          style={{
            gridColumn: `${tab.props.start} / ${tab.props.end}`,
            gridRow: 1,
            height: `${(tab.props.height ?? HEADER_BLOCK_HEIGHT)}px`,
          }}
          className={cn("w-full border-b", BORDER_COLOR)}
        >
          {tab.props.children}
        </div>
      ))}
      {columns.map((child, index) => {
        const isLast = index === columnCount - 1;
        const isFirst = index === 0;
        const columnIndex = index + 1;
        // Does this column fall beneath any tab's column span?
        const isCovered = tabs.some(
          (tab) =>
            columnIndex >= tab.props.start && columnIndex < tab.props.end
        );
        // Covered columns start on row 2 under the tabs. Uncovered columns span both
        // rows so their content fills the full height whether tabs exist or not.
        const gridRow = maxTabHeight
          ? isCovered
            ? 2
            : "1 / span 2"
          : 1;
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
              const startWidth =
                columnRefs.current[index]?.getBoundingClientRect().width || 0;
              const nextStartWidth =
                columnRefs.current[index + 1]?.getBoundingClientRect().width || 0;
              startResize(index, startWidth, nextStartWidth, e);
            }}
            style={{ gridColumn: columnIndex, gridRow }}
          >
            {child.props.children}
          </GridColumnBase>
        );
      })}
    </div>
  );
}
