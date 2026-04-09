export const StockByLocation = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Stock por Ubicación
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">Bodega A (Químicos)</span>
            <span className="font-semibold">75%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">Bodega B (Consumibles)</span>
            <span className="font-semibold">40%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
            <div
              className="bg-secondary h-2 rounded-full"
              style={{ width: "40%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">Bodega C (Repuestos)</span>
            <span className="font-semibold">92%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: "92%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
