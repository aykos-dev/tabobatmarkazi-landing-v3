import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/** Markdown written in the admin, set in the site's reading style. Raw HTML is not rendered. */
const components: Components = {
  h2: ({ children }) => <h2 className="pt-4 text-2xl leading-tight font-bold tracking-[-0.02em] md:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="pt-2 text-xl leading-tight font-bold md:text-2xl">{children}</h3>,
  ul: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
  blockquote: ({ children }) => <blockquote className="border-l-4 border-ink pl-4 text-ink-2">{children}</blockquote>,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  },
  img: () => null,
};

export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
