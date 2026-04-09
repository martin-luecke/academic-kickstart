"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CodeBlock(props: React.ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = (props.children as React.ReactElement<{ children?: string }>)
      ?.props?.children;
    if (typeof code === "string") {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative my-6">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md p-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-gray-400" />
        )}
      </button>
      <pre
        className="overflow-x-auto rounded-lg bg-slate-900 dark:bg-slate-950 p-4 text-sm text-slate-50 font-mono leading-relaxed"
        {...props}
      />
    </div>
  );
}
