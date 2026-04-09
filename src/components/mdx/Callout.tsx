import { Info, AlertTriangle, Lightbulb } from "lucide-react";

const styles = {
  info: {
    icon: Info,
    border: "border-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-500",
  },
  tip: {
    icon: Lightbulb,
    border: "border-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
    iconColor: "text-green-500",
  },
} as const;

interface CalloutProps {
  type?: keyof typeof styles;
  children: React.ReactNode;
}

export function Callout({ type = "info", children }: CalloutProps) {
  const style = styles[type];
  const Icon = style.icon;

  return (
    <div
      className={`my-6 flex gap-3 rounded-lg border-l-4 ${style.border} ${style.bg} p-4`}
    >
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${style.iconColor}`} />
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}
