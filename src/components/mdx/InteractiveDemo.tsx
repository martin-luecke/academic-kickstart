"use client";

import dynamic from "next/dynamic";
import { AlertTriangle } from "lucide-react";

// Register your demo components here
const demoRegistry: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  // Example:
  // CompilerPipeline: () => import("@/components/demos/CompilerPipeline"),
};

interface InteractiveDemoProps {
  component: string;
}

export function InteractiveDemo({ component }: InteractiveDemoProps) {
  const loader = demoRegistry[component];

  if (!loader) {
    return (
      <div className="my-8 flex items-center gap-3 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20 p-4">
        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Demo component &quot;{component}&quot; is not registered. Add it to the
          demo registry in <code>InteractiveDemo.tsx</code>.
        </p>
      </div>
    );
  }

  const DemoComponent = dynamic(loader, {
    loading: () => (
      <div className="my-8 flex items-center justify-center h-64 rounded-lg border border-primary-200/50 dark:border-primary-800/30 bg-primary-50/50 dark:bg-primary-900/10 animate-pulse">
        <p className="text-sm text-foreground/50">Loading demo...</p>
      </div>
    ),
  });

  return (
    <div className="my-8 rounded-lg border border-primary-200/50 dark:border-primary-800/30 p-4 overflow-hidden">
      <DemoComponent />
    </div>
  );
}
