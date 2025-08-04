import React from "react";
import { Button } from "./ui/button";
import {
  PanelLeft,
  PanelLeftClose,
  PanelRight,
  PanelRightClose,
} from "./icons";

const HEADER_BLOCK_HEIGHT = 44;

interface GridColumnProps {
  children: React.ReactNode;
  hasToggler?: boolean;
  title?: string;
  actions?: React.ReactNode;
  isLast?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function GridColumn({
  children,
  hasToggler = false,
  title,
  actions,
  isLast = false,
  collapsed = false,
  onToggle,
}: GridColumnProps) {
  const headerHeight =
    (actions ? HEADER_BLOCK_HEIGHT : 0) +
    (title ? HEADER_BLOCK_HEIGHT : 0);
  const contentHeight = `calc(100% - ${headerHeight}px)`;

  const Icon = isLast
    ? collapsed
      ? PanelRight
      : PanelRightClose
    : collapsed
    ? PanelLeft
    : PanelLeftClose;

  const togglePosition = collapsed
    ? isLast
      ? "left-0"
      : "right-0"
    : isLast
    ? "-left-3"
    : "-right-3";

  return (
    <div className="relative flex h-full flex-col">
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
          {actions && (
            <div style={{ height: HEADER_BLOCK_HEIGHT }}>{actions}</div>
          )}
          {title && (
            <div
              className="font-bold whitespace-nowrap"
              style={{ height: HEADER_BLOCK_HEIGHT }}
            >
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
}
