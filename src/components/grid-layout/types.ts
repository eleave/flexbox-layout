export interface GridColumnPublicProps {
  /** Display the column resize handle */
  showResizer?: boolean;
  /** Show toggle button */
  showToggler?: boolean;
  /** Enable vertical scrolling within the column */
  showScroller?: boolean;
  /** Additional class names */
  className?: string;
  /** Column content */
  children: React.ReactNode;
}

export interface GridColumnBaseProps extends GridColumnPublicProps {
  /** Is this the first column? */
  isFirst?: boolean;
  /** Is this the last column? */
  isLast?: boolean;
  /** Is the column collapsed? */
  isCollapsed?: boolean;
  /** Handler for toggling collapsed state */
  onToggle?: () => void;
  /** Mouse event handler for starting column resize */
  onResizeStart?: (e: React.MouseEvent) => void;
  /** Is the column currently being resized? */
  isResizing?: boolean;
}
