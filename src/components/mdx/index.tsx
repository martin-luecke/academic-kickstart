import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { Math } from "./Math";
import { InteractiveDemo } from "./InteractiveDemo";

export const mdxComponents: MDXComponents = {
  pre: CodeBlock as MDXComponents["pre"],
  Callout,
  Math,
  InteractiveDemo,
  h1: (props) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />
  ),
  a: (props) => (
    <a
      className="text-primary-600 dark:text-primary-400 underline underline-offset-2"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-primary-100 dark:bg-primary-900/30 px-1.5 py-0.5 text-sm font-mono"
      {...props}
    />
  ),
};
