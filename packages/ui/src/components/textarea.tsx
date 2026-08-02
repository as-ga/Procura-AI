import * as React from "react";

import { cn } from "../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-40 w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm outline-none placeholder:text-zinc-500 focus:border-blue-600",
        className
      )}
      {...props}
    />
  );
}
