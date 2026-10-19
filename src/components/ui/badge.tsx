import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[6px] border px-2 py-0.5 font-mono text-[12px] leading-5 transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "border-line bg-surface text-fg-muted",
        secondary: "border-line bg-raised text-fg",
        outline: "border-line-strong bg-transparent text-fg-muted",
        gold: "border-gold/40 bg-gold/10 text-gold-ink",
        solid: "border-transparent bg-fg text-bg",
        destructive: "border-destructive/40 bg-destructive/10 text-destructive",
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
