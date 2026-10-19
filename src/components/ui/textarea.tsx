import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-brand border border-borderSubtle bg-surface px-3 py-2 font-body text-sm text-primaryText shadow-none transition-colors placeholder:text-mutedText/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus focus-visible:border-primaryText disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
