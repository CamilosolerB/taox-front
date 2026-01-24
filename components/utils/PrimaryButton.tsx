interface PrimaryButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  backgroundColor?: string;
}
export const PrimaryButton = ({
  onClick,
  children,
  disabled,
  type = "button",
  backgroundColor,
}: PrimaryButtonProps) => {
  return (
    <div className="pt-4 pb-2">
      <button
        className={`w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-${backgroundColor || "primary"} text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-${backgroundColor || "primary"}/90 shadow-lg shadow-${backgroundColor || "primary"}/30 transition-all active:scale-95`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        <span className="truncate">{children}</span>
      </button>
    </div>
  );
};
