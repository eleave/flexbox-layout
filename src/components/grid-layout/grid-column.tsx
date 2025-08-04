"use client";

import React from "react";
import { PanelLeft, PanelLeftClose, PanelRight, PanelRightClose } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/utils";

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
  isResizing?: boolean;
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
    isResizing = false,
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

  const togglePosition = isLast ? "left-2" : "right-2";

  const borderClass = isFirst ? "" : "border-l border-neutral-300";

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full flex-col",
        !isResizing && "transition-[width] duration-300",
        borderClass,
        className
      )}
    >
      {hasToggler && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={`border border-neutral-300 cursor-pointer absolute top-2.5 ${togglePosition}`}
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
            className="px-12 uppercase flex flex-1 items-center justify-start text-sm"
            style={{ writingMode: "vertical-rl" }}
          >
            {title}
          </div>
        ) : null
      ) : (
        <>
          {actions && (
            <div className="p-2" style={{ height: HEADER_BLOCK_HEIGHT }}>
              {actions}
            </div>
          )}
          {title && (
            <div
              className={cn("p-2 flex items-center font-bold whitespace-nowrap", {
                "indent-8": isLast,
              })}
              style={{ height: HEADER_BLOCK_HEIGHT }}
            >
              {title}
            </div>
          )}
          <div className="overflow-y-auto p-2" style={{ height: contentHeight }}>
            {children}
          </div>
        </>
      )}
    </div>
  );
});
