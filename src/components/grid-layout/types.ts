export interface GridColumnPublicProps {
  /** Display the column resize handle */
  showResizer?: boolean;
  /** Show toggle button */
  showToggler?: boolean;
  /** Enable vertical scrolling within the column */
  showScroller?: boolean;
  /** Optional title displayed in the column header */
  title?: string;
  /** Optional action elements rendered in the header */
  actions?: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Column content */
  children: React.ReactNode;
}

export interface GridColumnInternalProps {
  onResizeStart?: (e: React.MouseEvent) => void;
  isFirst?: boolean;
  isLast?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
  isResizing?: boolean;
}

export type GridColumnBaseProps = GridColumnPublicProps & GridColumnInternalProps;
