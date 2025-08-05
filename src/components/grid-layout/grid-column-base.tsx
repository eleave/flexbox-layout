"use client";

import React from "react";
import { PanelLeft, PanelLeftClose, PanelRight, PanelRightClose } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/utils";
import type { GridColumnBaseProps } from "./types";

const HEADER_BLOCK_HEIGHT = 48;
const BORDER_COLOR = "border-neutral-300";

export const GridColumnBase = React.forwardRef<HTMLDivElement, GridColumnBaseProps>(
  function GridColumnBase(
    {
      children,
      showToggler = false,
      title,
      tabs,
      actions,
      isFirst = false,
      isLast = false,
      collapsed = false,
      onToggle,
      className = "",
      showResizer = false,
      onResizeStart,
      isResizing = false,
      showScroller = true,
    },
    ref
  ) {
    let Icon;
    if (isLast) {
      Icon = collapsed ? PanelRight : PanelRightClose;
    } else {
      Icon = collapsed ? PanelLeft : PanelLeftClose;
    }

    const togglePosition = isLast ? "left-3" : "right-3";

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
        {showToggler && (
          <Button
            variant="outline"
            size="icon"
            onClick={onToggle}
            className={`absolute top-3 w-6 h-6 ${togglePosition}`}
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
            {tabs && (
              <div className="p-3" style={{ height: HEADER_BLOCK_HEIGHT }}>
                {tabs}
              </div>
            )}
            {actions && (
              <div
                className={cn("p-3", { "text-right": isLast })}
                style={{ height: HEADER_BLOCK_HEIGHT }}
              >
                {actions}
              </div>
            )}
            {title && (
              <div
                className={cn(
                  "p-3 flex items-center font-semibold whitespace-nowrap text-lg border-b",
                  BORDER_COLOR,
                  {
                    "indent-8": isLast && !actions && !tabs,
                  }
                )}
                style={{ height: HEADER_BLOCK_HEIGHT }}
              >
                {title}
              </div>
            )}
            <div className={cn("flex-1 p-3", showScroller && "overflow-y-auto min-h-0")}>
              {children}
            </div>
          </>
        )}
      </div>
    );
  }
);
