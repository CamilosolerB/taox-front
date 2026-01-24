import { EllipsisVertical, MapPin } from "lucide-react";
import { Product } from "@/interfaces/product";

export const ProductsTable = ({ products }: { products: Product[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <th className="px-6 py-4">Código (SKU)</th>
            <th className="px-6 py-4">Nombre</th>
            <th className="px-6 py-4">Nombre generico</th>
            <th className="px-6 py-4">Ubicacion</th>
            <th className="px-6 py-4">Total Inventario</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {products.map((product, index) => (
            <tr
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              key={index}
            >
              <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400 uppercase">
                {product.codigo_producto}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {product.nombre}
                </div>
                <div className="text-xs text-slate-500">
                  {product.nombre_generico}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>{product.ubicacion}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {product.total_inventario}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                  Disponible
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <EllipsisVertical className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
