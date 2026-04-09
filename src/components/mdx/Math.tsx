"use client";

import { useEffect, useRef } from "react";

interface MathProps {
  formula: string;
  display?: boolean;
}

export function Math({ formula, display = false }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    async function render() {
      const katex = (await import("katex")).default;
      if (ref.current) {
        katex.render(formula, ref.current, {
          throwOnError: false,
          displayMode: display,
        });
      }
    }
    render();
  }, [formula, display]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
      />
      <span ref={ref} className={display ? "block my-4 text-center" : ""} />
    </>
  );
}
