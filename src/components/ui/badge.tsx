import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-brand border px-2 py-0.5 font-mono text-[11px] font-medium tracking-tight transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-focus",
  {
    variants: {
      variant: {
        default: "border-borderSubtle bg-surface text-primaryText shadow-none hover:border-gold/50",
        secondary: "border-borderSubtle bg-card text-mutedText shadow-none hover:text-primaryText",
        destructive: "border-red-900/30 bg-red-900/10 text-red-500 shadow-none",
        outline: "border-borderSubtle text-primaryText bg-transparent shadow-none",
        gold: "border-gold/30 bg-gold/10 text-gold shadow-none",
        solid: "border-transparent bg-primaryText text-base shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
