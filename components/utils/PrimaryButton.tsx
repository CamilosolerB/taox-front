import Link from "next/link";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  backgroundColor?: string;
  className?: string;
}

export const PrimaryButton = ({
  onClick,
  children,
  disabled,
  type = "button",
  backgroundColor,
  className = "",
  ...props
}: PrimaryButtonProps) => {
  const bgColor = backgroundColor || "primary";
  const baseClasses = `flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg transition-all active:scale-95`;

  return (
    <div className={`pt-4 pb-2 ${className.includes("flex-1") ? "" : ""}`}>
      <button
        className={`${baseClasses} bg-${bgColor} hover:bg-${bgColor}/90 shadow-${bgColor}/30 ${className}`}
        style={{
          backgroundColor: `var(--color-${bgColor}, #3b82f6)`,
        }}
        type={type}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        <span className="truncate">{children}</span>
      </button>
    </div>
  );
};
