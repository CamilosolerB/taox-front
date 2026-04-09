import { LucideIcon } from "lucide-react";

interface NotifyCardProps {
  icon: LucideIcon;
  text: string;
  value: string;
  color: string;
  isDash: boolean;
  colorDash?: string;
  valueDash?: string;
}

export const NotifyCard = ({
  icon: Icon,
  text,
  value,
  color,
  isDash,
  colorDash,
  valueDash,
}: NotifyCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400 rounded-lg`}>
          <Icon />
        </div>
        {isDash && (
          <span
            className={`text-xs font-medium text-${colorDash}-500 bg-${colorDash}-100 dark:bg-${colorDash}-900/30 px-2 py-1 rounded-full`}
          >
            {valueDash}
          </span>
        )}
      </div>
      <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {text}
      </h3>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
};
