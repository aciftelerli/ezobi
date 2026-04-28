"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "yellow" | "coral" | "ghost" | "ghost-blue" | "link";
type Size    = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   Variant;
  size?:      Size;
  loading?:   boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#0EA5E9] text-white shadow-[0_2px_8px_rgba(14,165,233,0.35)] hover:bg-[#0284C7] hover:shadow-[0_4px_16px_rgba(14,165,233,0.45)]",
  yellow:
    "bg-[#FBBF24] text-amber-900 shadow-[0_2px_8px_rgba(251,191,36,0.35)] hover:bg-[#D97706]",
  coral:
    "bg-[#F97316] text-white shadow-[0_2px_8px_rgba(249,115,22,0.35)] hover:bg-[#EA580C]",
  ghost:
    "bg-transparent text-neutral-700 border border-neutral-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9] hover:bg-sky-50",
  "ghost-blue":
    "bg-sky-50 text-[#0284C7] border border-sky-200 hover:bg-sky-100",
  link:
    "bg-transparent text-[#0EA5E9] underline-offset-4 hover:underline p-0 shadow-none",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-[10px] gap-1.5",
  md: "px-6 py-2.5 text-[15px] rounded-xl gap-2",
  lg: "px-7 py-3 text-base rounded-[14px] gap-2",
  xl: "px-9 py-[14px] text-[17px] rounded-2xl gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, leftIcon, rightIcon, fullWidth = false, disabled, className, children, ...props }, ref) => {
    const isDisabled = disabled || loading;
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: isDisabled ? 1 : 0.97 }}
        transition={{ duration: 0.1 }}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-semibold leading-none whitespace-nowrap select-none",
          "transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2",
          variantClasses[variant],
          sizeClasses[size],
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          fullWidth && "w-full",
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
