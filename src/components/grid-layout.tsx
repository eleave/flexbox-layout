import React from "react";

interface GridLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  height?: string;
}

export default function GridLayout({
  children,
  scrollable = false,
  height = "100vh",
}: GridLayoutProps) {
  const childArray = React.Children.toArray(children);
  const columnCount = Math.max(childArray.length, 1);

  return (
    <div
      className={`grid grid-cols-${columnCount} gap-4`}
      style={{
        height,
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {childArray.map((child, index) => (
        <div
          key={index}
          className={scrollable ? "overflow-y-scroll" : undefined}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
