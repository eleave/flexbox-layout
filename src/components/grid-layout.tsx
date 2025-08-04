import React from "react";
import useGridColumnVisibility from "../hooks/use-grid-column-visibility";

interface GridLayoutProps {
  children: React.ReactNode;
  height?: string;
  name: string;
  scrollable?: boolean; // allow extra prop used elsewhere
}

export default function GridLayout({
  children,
  name,
  height = "100vh",
}: GridLayoutProps) {
  const childArray = React.Children.toArray(children) as React.ReactElement[];
  const columnCount = Math.max(childArray.length, 1);
  const [visibility, toggle] = useGridColumnVisibility(name, columnCount);

  return (
    <div
      className={`grid gap-4`}
      style={{
        height,
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {childArray.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              isLast: index === columnCount - 1,
              collapsed: !visibility[index],
              onToggle: () => toggle(index),
            })
          : child
      )}
    </div>
  );
}
