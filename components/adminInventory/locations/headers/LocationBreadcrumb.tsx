'use client';

interface LocationBreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export const LocationBreadcrumb = ({ items }: LocationBreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-[#1a2530] border-b border-[#dbe0e6] dark:border-[#2d3947]">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <a className="text-[#617589] text-sm font-medium hover:text-primary" href={item.href}>
              {item.label}
            </a>
          ) : (
            <span className="text-[#111418] dark:text-white text-sm font-bold">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="text-[#617589] text-sm">/</span>}
        </div>
      ))}
    </div>
  );
};
