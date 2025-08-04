"use client";

import React from "react";
import { PanelLeft, PanelLeftClose, PanelRight, PanelRightClose } from "lucide-react";
import { Button } from "../ui/button";

const HEADER_BLOCK_HEIGHT = 44;

export interface GridColumnProps {
  showResizer?: boolean;
  onResizeStart?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  hasToggler?: boolean;
  title?: string;
  actions?: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const GridColumn = React.forwardRef<HTMLDivElement, GridColumnProps>(function GridColumn(
  {
    children,
    hasToggler = false,
    title,
    actions,
    isFirst = false,
    isLast = false,
    collapsed = false,
    onToggle,
    className = "",
    showResizer = false,
    onResizeStart,
  },
  ref
) {
  const headerHeight = (actions ? HEADER_BLOCK_HEIGHT : 0) + (title ? HEADER_BLOCK_HEIGHT : 0);
  const contentHeight = `calc(100% - ${headerHeight}px)`;

  let Icon;
  if (isLast) {
    Icon = collapsed ? PanelRight : PanelRightClose;
  } else {
    Icon = collapsed ? PanelLeft : PanelLeftClose;
  }

  let togglePosition;
  if (collapsed) {
    togglePosition = isLast ? "left-0" : "right-0";
  } else {
    togglePosition = isLast ? "-left-3" : "-right-3";
  }

  const borderClass = isFirst ? "" : "border-l border-neutral-300";

  return (
    <div ref={ref} className={`relative flex h-full flex-col ${borderClass} ${className}`}>
      {hasToggler && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={`absolute top-0 ${togglePosition}`}
        >
          <Icon className="h-4 w-4" />
        </Button>
      )}
      {showResizer && !collapsed && (
        <div
          className="absolute top-0 -right-0.5 z-10 h-full w-1 cursor-col-resize select-none bg-transparent hover:bg-gray-300"
          onMouseDown={onResizeStart}
        />
      )}
      {collapsed ? (
        title ? (
          <div
            className="flex flex-1 items-center justify-center text-sm"
            style={{ writingMode: "vertical-rl" }}
          >
            {title}
          </div>
        ) : null
      ) : (
        <>
          {actions && <div style={{ height: HEADER_BLOCK_HEIGHT }}>{actions}</div>}
          {title && (
            <div className="font-bold whitespace-nowrap" style={{ height: HEADER_BLOCK_HEIGHT }}>
              {title}
            </div>
          )}
          <div className="overflow-y-auto" style={{ height: contentHeight }}>
            {children}
          </div>
        </>
      )}
    </div>
  );
});
