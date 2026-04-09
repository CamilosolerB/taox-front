'use client';

interface TankIndicatorProps {
  id: string;
  percentage: number;
  name: string;
  description: string;
}

export const TankIndicator = ({ id, percentage, name, description }: TankIndicatorProps) => {
  const getIndicatorColor = (percent: number) => {
    if (percent < 20) return 'bg-red-500/40';
    if (percent < 50) return 'bg-yellow-500/40';
    return 'bg-primary/40';
  };

  const getTextColor = (percent: number) => {
    if (percent < 20) return 'text-red-600';
    if (percent < 50) return 'text-yellow-600';
    return 'text-primary';
  };

  return (
    <div className="bg-white dark:bg-[#1a2530] p-4 rounded-xl border border-[#dbe0e6] dark:border-[#2d3947]">
      <div className="flex justify-between items-end mb-4 h-32 w-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden border-2 border-gray-300 dark:border-gray-600">
        <div
          className={`absolute bottom-0 left-0 w-full ${getIndicatorColor(percentage)}`}
          style={{ height: `${percentage}%` }}
        ></div>
        <div className={`absolute inset-0 flex items-center justify-center font-bold text-xs ${getTextColor(percentage)}`}>
          {percentage}%
        </div>
      </div>
      <p className="text-center text-sm font-bold">{name}</p>
      <p className="text-center text-[10px] text-[#617589]">{description}</p>
    </div>
  );
};
