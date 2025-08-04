import React from "react";

interface GridLayoutProps {
  children: React.ReactNode;
  height?: string;
}

export default function GridLayout({
  children,
  height = "100vh",
}: GridLayoutProps) {
  const childArray = React.Children.toArray(children) as React.ReactElement[];
  const columnCount = Math.max(childArray.length, 1);

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
            })
          : child
      )}
    </div>
  );
}
