'use client';

interface LocationTableRowProps {
  productName: string;
  sku: string;
  location: string;
  batchNumber: string;
  quantity: string;
  percentage: number;
  status: string;
  statusColor: string;
  onAction?: () => void;
  rowClassName?: string;
}

export const LocationTableRow = ({
  productName,
  sku,
  location,
  batchNumber,
  quantity,
  percentage,
  status,
  statusColor,
  onAction,
  rowClassName = '',
}: LocationTableRowProps) => {
  return (
    <tr className={`hover:bg-gray-50 dark:hover:bg-[#212d3a] transition-colors ${rowClassName}`}>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-bold text-sm text-[#111418] dark:text-white">{productName}</span>
          <span className="text-xs text-[#617589]">SKU: {sku}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">{location}</td>
      <td className="px-6 py-4 font-mono text-xs">{batchNumber}</td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className={`font-bold text-sm ${percentage < 30 ? 'text-red-500' : 'text-[#111418] dark:text-white'}`}>
            {quantity}
          </span>
          <div className="w-24 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-1">
            <div
              className={`h-full rounded-full ${
                percentage < 30 ? 'bg-red-500' : percentage < 60 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statusColor}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={onAction}
          className="text-[#617589] hover:text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </td>
    </tr>
  );
};
