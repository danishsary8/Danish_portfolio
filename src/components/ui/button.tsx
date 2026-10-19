import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control text-sm font-medium cursor-pointer transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-borderFocus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-none",
  {
    variants: {
      variant: {
        default:
          "bg-primaryText text-[var(--bg-base)] border border-transparent hover:bg-gold hover:text-[#0A0A0A]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-borderSubtle bg-transparent text-primaryText hover:bg-surface hover:border-gold",
        secondary: "glass-panel rounded-control text-primaryText hover:border-gold",
        ghost: "bg-transparent text-primaryText hover:bg-surface hover:text-primaryText",
        glass: "glass-panel rounded-control text-primaryText hover:border-gold",
        link: "text-gold-ink underline-offset-4 hover:underline",
        cta: "bg-gold text-[#0A0A0A] font-semibold hover:bg-gold-hover border border-transparent",
        goldOutline:
          "border border-gold text-gold font-medium bg-transparent hover:bg-gold hover:text-primaryText",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
