import React from "react";

const baseProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const PanelLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...baseProps} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
);

export const PanelLeftClose = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...baseProps} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <path d="M15 9l-3 3 3 3" />
  </svg>
);

export const PanelRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...baseProps} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);

export const PanelRightClose = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...baseProps} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="15" y1="3" x2="15" y2="21" />
    <path d="M9 9l3 3-3 3" />
  </svg>
);
