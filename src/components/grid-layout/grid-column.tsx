"use client";

import React from "react";
import { PanelLeft, PanelLeftClose, PanelRight, PanelRightClose } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/utils";

const HEADER_BLOCK_HEIGHT = 40;
const BORDER_COLOR = "border-neutral-300";

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
  scrollable?: boolean;
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
    scrollable = true,
  },
  ref
) {
  let Icon;
  if (isLast) {
    Icon = collapsed ? PanelRight : PanelRightClose;
  } else {
    Icon = collapsed ? PanelLeft : PanelLeftClose;
  }

  const togglePosition = isLast ? "left-2" : "right-2";

  const borderClass = isFirst ? "" : `border-l ${BORDER_COLOR}`;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full min-h-0 flex-col",
        !isResizing && "transition-[width] duration-300",
        borderClass,
        className
      )}
    >
      {hasToggler && (
        <Button
          variant="outline"
          size="icon"
          onClick={onToggle}
          className={`border !${BORDER_COLOR} absolute top-2 ${togglePosition}`}
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
              className={cn(
                "p-2 flex items-center font-semibold whitespace-nowrap text-lg border-b",
                BORDER_COLOR,
                {
                  "indent-8": isLast,
                }
              )}
              style={{ height: HEADER_BLOCK_HEIGHT }}
            >
              {title}
            </div>
          )}
          <div
            className={cn(
              "flex-1 p-2",
              scrollable && "overflow-y-auto min-h-0"
            )}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
});
