"use client";

import React from "react";
import { GridColumnBase } from "./grid-column-base";
import type { GridColumnPublicProps } from "./types";

export type {
  GridColumnPublicProps,
  GridColumnInternalProps,
  GridColumnBaseProps,
} from "./types";

export const GridColumn = React.forwardRef<HTMLDivElement, GridColumnPublicProps>(function GridColumn(
  props,
  ref
) {
  return <GridColumnBase ref={ref} {...props} />;
});
