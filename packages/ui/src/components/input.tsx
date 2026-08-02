import * as React from "react";

import { cn } from "../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-sm outline-none placeholder:text-zinc-500 focus:border-blue-600",
        className
      )}
      {...props}
    />
  );
}
