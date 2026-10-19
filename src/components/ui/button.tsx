import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-sm font-medium cursor-pointer transition-[color,background-color,border-color] duration-140 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-borderFocus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-none",
  {
    variants: {
      variant: {
        default:
          "bg-primaryText text-base border border-transparent hover:bg-gold hover:text-primaryText",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-borderSubtle bg-transparent text-primaryText hover:bg-surface hover:border-primaryText",
        secondary:
          "bg-surface text-primaryText border border-borderSubtle hover:bg-surface/80 hover:border-gold",
        ghost: "bg-transparent text-primaryText hover:bg-surface hover:text-primaryText",
        link: "text-gold underline-offset-4 hover:underline",
        cta: "bg-gold text-primaryText font-semibold hover:bg-gold-hover border border-transparent",
        goldOutline:
          "border border-gold text-gold font-medium bg-transparent hover:bg-gold hover:text-primaryText",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-[3px] px-3 text-xs",
        lg: "h-11 rounded-[3px] px-6 text-base",
        icon: "h-9 w-9 rounded-[3px]",
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
