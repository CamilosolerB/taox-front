"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function resolveHref(href?: string) {
  if (!href) return href;
  const legacyReportPath = "/static/uploads/reports/";
  const reportPath = "/copilot/reports/";

  if (href.startsWith(reportPath)) return `${API_BASE}${href}`;
  if (href.startsWith(legacyReportPath)) {
    return `${API_BASE}${reportPath}${href.slice(legacyReportPath.length)}`;
  }

  try {
    const url = new URL(href);
    if (url.pathname.startsWith(legacyReportPath)) {
      url.pathname = `${reportPath}${url.pathname.slice(legacyReportPath.length)}`;
      return url.toString();
    }
  } catch {
    // Leave non-URL Markdown links untouched.
  }

  if (href.startsWith("/static")) return `${API_BASE}${href}`;
  return href;
}

function isReportDownload(href?: string) {
  if (!href) return false;
  try {
    return new URL(resolveHref(href) || href, API_BASE).pathname.startsWith("/copilot/reports/");
  } catch {
    return false;
  }
}

const components: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="marker:text-slate-400">{children}</li>,
  h1: ({ children }) => (
    <h1 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-sm font-semibold mb-2 mt-3 first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold mb-1 mt-2 first:mt-0">{children}</h3>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => {
    const download = isReportDownload(href);
    return (
      <a
        href={resolveHref(href)}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        className="text-primary font-medium underline underline-offset-2 break-all"
      >
        {children}
      </a>
    );
  },
  code: ({ children }) => (
    <code className="px-1 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700/70 text-[0.8em]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-2 p-2 rounded-lg bg-slate-200/60 dark:bg-slate-700/60 overflow-x-auto text-xs">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto">
      <table className="w-full border-collapse text-xs">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-slate-200/60 dark:bg-slate-700/60">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border border-slate-300 dark:border-slate-600 px-2 py-1 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-slate-300 dark:border-slate-600 px-2 py-1">{children}</td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-slate-300 dark:border-slate-600 pl-3 italic text-slate-500 mb-2">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-3 border-slate-200 dark:border-slate-700" />,
};

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

export function MarkdownMessage({ content, className = "" }: MarkdownMessageProps) {
  return (
    <div className={`text-sm leading-relaxed ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
