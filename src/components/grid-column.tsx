import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  PanelLeft,
  PanelLeftClose,
  PanelRight,
  PanelRightClose,
} from "./icons";

interface GridColumnProps {
  children: React.ReactNode;
  hasToggler?: boolean;
  title?: string;
  actions?: React.ReactNode;
  isLast?: boolean;
}

export default function GridColumn({
  children,
  hasToggler = false,
  title,
  actions,
  isLast = false,
}: GridColumnProps) {
  const [collapsed, setCollapsed] = useState(false);

  const headerHeight = (actions ? 24 : 0) + (title ? 24 : 0);
  const contentHeight = `calc(100% - ${headerHeight}px)`;

  const handleToggle = () => setCollapsed(!collapsed);

  const Icon = isLast
    ? collapsed
      ? PanelRight
      : PanelRightClose
    : collapsed
    ? PanelLeft
    : PanelLeftClose;

  return (
    <div className="relative flex h-full flex-col">
      {hasToggler && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className={`absolute top-0 ${isLast ? "-left-3" : "-right-3"}`}
        >
          <Icon className="h-4 w-4" />
        </Button>
      )}
      {!collapsed && (
        <>
          {actions && <div className="h-6">{actions}</div>}
          {title && (
            <div className="h-6 font-bold whitespace-nowrap">{title}</div>
          )}
          <div className="overflow-y-auto" style={{ height: contentHeight }}>
            {children}
          </div>
        </>
      )}
    </div>
  );
}
