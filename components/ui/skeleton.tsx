import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-950 bg-opacity-[0.15] dark:bg-slate-400 dark:bg-opacity-[0.32]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
