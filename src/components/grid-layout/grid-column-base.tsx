"use client";

import { forwardRef, useMemo, useState, type ReactNode } from "react";

import { PanelLeft, PanelLeftClose, PanelRight, PanelRightClose } from "lucide-react";

import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";

import { BORDER_COLOR, HEADER_BLOCK_HEIGHT } from "./constants";
import { GridColumnSlotContext } from "./grid-column-slots";
import type { GridColumnBaseProps } from "./types";

// eslint-disable-next-line max-lines-per-function
export const GridColumnBase = forwardRef<HTMLDivElement, GridColumnBaseProps>(
  function GridColumnBase(
    {
      children,
      showToggler = false,
      isFirst = false,
      isLast = false,
      isCollapsed = false,
      onToggle,
      className = "",
      showResizer = false,
      onResizeStart,
      isResizing = false,
      showScroller = true,
      style,
    },
    ref
  ) {
    const [title, setTitle] = useState<ReactNode>(null);
    const [tabs, setTabs] = useState<ReactNode>(null);
    const [actions, setActions] = useState<ReactNode>(null);
    const [footer, setFooter] = useState<ReactNode>(null);

    const slotContext = useMemo(
      () => ({ setTitle, setActions, setTabs, setFooter }),
      [setTitle, setActions, setTabs, setFooter]
    );

    let Icon;
    if (isLast) {
      Icon = isCollapsed ? PanelRight : PanelRightClose;
    } else {
      Icon = isCollapsed ? PanelLeft : PanelLeftClose;
    }

    const togglePosition = isLast ? "left-3" : "right-3";

    const borderClass = isFirst ? "" : `border-l ${BORDER_COLOR}`;

    return (
      <GridColumnSlotContext.Provider value={slotContext}>
        <div
          ref={ref}
          className={cn(
            "relative flex h-full min-h-0 flex-col",
            !isResizing && "transition-[width] duration-300",
            borderClass,
            className
          )}
          style={style}
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
          {showResizer && !isCollapsed && (
            <div
              className="absolute top-0 -right-0.5 z-10 h-full w-1 cursor-col-resize select-none bg-transparent hover:bg-gray-300"
              onMouseDown={onResizeStart}
            />
          )}
          {isCollapsed ? (
            title && (
              <div
                className="px-12 uppercase flex flex-1 items-center justify-start text-sm"
                style={{ writingMode: "vertical-rl" }}
              >
                {title}
              </div>
            )
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
                      "indent-8": showToggler && isLast && !actions && !tabs,
                    }
                  )}
                  style={{ height: HEADER_BLOCK_HEIGHT }}
                >
                  <div className="w-full truncate">{title}</div>
                </div>
              )}
            </>
          )}
          <div
            className={cn("flex-1 p-3", {
              "overflow-y-auto min-h-0": showScroller,
              hidden: isCollapsed,
            })}
          >
            {children}
          </div>
          {footer && <div className={cn("p-3 border-t", BORDER_COLOR)}>{footer}</div>}
        </div>
      </GridColumnSlotContext.Provider>
    );
  }
);
