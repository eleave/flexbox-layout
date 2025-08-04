import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "icon" | "small";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border";
    const variants: Record<string, string> = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent",
      ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground border-transparent",
      outline: "bg-transparent border-neutral-500 text-neutral-900 hover:bg-neutral-100",
    };
    const sizes: Record<string, string> = {
      default: "h-10 px-4 py-2",
      small: "h-8 px-3 py-1 text-xs",
      icon: "h-6 w-6 p-0",
    };
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
