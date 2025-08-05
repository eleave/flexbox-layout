"use client";

import { forwardRef } from "react";

import { GridColumnBase } from "./grid-column-base";
import type { GridColumnPublicProps } from "./types";
export { GridColumnTitle, GridColumnActions, GridColumnTabs } from "./grid-column-slots";

export type { GridColumnPublicProps, GridColumnBaseProps } from "./types";

export const GridColumn = forwardRef<HTMLDivElement, GridColumnPublicProps>(function GridColumn(
  props,
  ref
) {
  return <GridColumnBase ref={ref} {...props} />;
});
