import { Sidebar } from "@/components/adminInventory/utils";
import { History, ArrowRightLeft, PieChart, TrendingUp, Layers, AlertTriangle, Filter, MoreVertical } from "lucide-react";

const DashboardWareHousePage = () => {
    return (
        <Sidebar>
            <main className="flex-1 flex flex-col overflow-hidden">
<div className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-[#1a2530] border-b border-[#dbe0e6] dark:border-[#2d3947]">
<a className="text-[#617589] text-sm font-medium hover:text-primary" href="#">Main Plant</a>
<span className="text-[#617589] text-sm">/</span>
<a className="text-[#617589] text-sm font-medium hover:text-primary" href="#">Almacén A</a>
<span className="text-[#617589] text-sm">/</span>
<span className="text-[#111418] dark:text-white text-sm font-bold">Zona Química</span>
</div>
<div className="flex-1 overflow-y-auto p-8">
<div className="flex flex-wrap justify-between items-end gap-3 mb-8">
<div className="flex flex-col gap-1">
<p className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-tight">Distribución del Almacén Químico</p>
<p className="text-[#617589] text-base font-normal">Niveles de stock detallados y colocación de inventario para <span className="font-bold text-primary">Almacén A</span>.</p>
</div>
<div className="flex gap-3">
<button className="flex items-center justify-center rounded-lg h-10 px-4 bg-[#f0f2f4] dark:bg-[#2d3947] text-[#111418] dark:text-white text-sm font-bold border border-[#dbe0e6] dark:border-[#3a4755]">
<History className="mr-2 text-lg w-5 h-5" /> Audit History
                        </button>
<button className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold tracking-[0.015em] shadow-lg shadow-primary/20">
<ArrowRightLeft className="mr-2 text-lg w-5 h-5" /> Transfer Stock
                        </button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a2530] border border-[#dbe0e6] dark:border-[#2d3947] shadow-sm">
<div className="flex justify-between items-start">
<p className="text-[#617589] text-sm font-medium uppercase tracking-wider">Utilización de Capacidad</p>
<PieChart className="text-primary w-5 h-5" />
</div>
<p className="text-[#111418] dark:text-white text-3xl font-bold">78.4%</p>
<div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{width: "78.4%"}}></div>
</div>
<p className="text-[#078838] text-sm font-semibold mt-1 flex items-center gap-1">
<TrendingUp className="w-4 h-4" /> 12% disponible
                        </p>
</div>
<div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a2530] border border-[#dbe0e6] dark:border-[#2d3947] shadow-sm">
<div className="flex justify-between items-start">
<p className="text-[#617589] text-sm font-medium uppercase tracking-wider">SKUs Totales</p>
<Layers className="text-primary w-5 h-5" />
</div>
<p className="text-[#111418] dark:text-white text-3xl font-bold">42 Items</p>
<p className="text-[#617589] text-sm font-medium mt-1">En 8 sub-ubicaciones</p>
</div>
<div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a2530] border border-[#dbe0e6] dark:border-[#2d3947] shadow-sm">
<div className="flex justify-between items-start">
<p className="text-[#617589] text-sm font-medium uppercase tracking-wider">Alertas de Stock Bajo</p>
<AlertTriangle className="text-red-500 w-5 h-5" />
</div>
<p className="text-red-500 text-3xl font-bold">5 Items</p>
<p className="text-[#e73908] text-sm font-semibold mt-1 flex items-center gap-1">
                            Requiere reorden inmediata
                        </p>
</div>
</div>
<div className="bg-white dark:bg-[#1a2530] rounded-xl border border-[#dbe0e6] dark:border-[#2d3947] overflow-hidden shadow-sm">
<div className="p-6 border-b border-[#dbe0e6] dark:border-[#2d3947] flex justify-between items-center">
<h3 className="text-lg font-bold">Distribución de Stock (STOCK_UBICACION)</h3>
<div className="flex gap-2">
<div className="relative">
<input className="pl-10 pr-4 py-2 bg-background-light dark:bg-[#2d3947] border-none rounded-lg text-sm focus:ring-1 focus:ring-primary w-64" placeholder="Filtrar productos..." type="text"/>
<Filter className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
</div>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-background-light dark:bg-[#141d26] text-[#617589] text-xs font-bold uppercase tracking-wider">
<th className="px-6 py-4">Producto / SKU</th>
<th className="px-6 py-4">Ubicación</th>
<th className="px-6 py-4">Lote #</th>
<th className="px-6 py-4">Cantidad</th>
<th className="px-6 py-4">Estado</th>
<th className="px-6 py-4 text-right">Acciones</th>
</tr>
</thead>
<tbody className="divide-y divide-[#dbe0e6] dark:divide-[#2d3947]">
<tr className="hover:bg-gray-50 dark:hover:bg-[#212d3a] transition-colors">
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-bold text-sm text-[#111418] dark:text-white">Sodium Hypochlorite (15%)</span>
<span className="text-xs text-[#617589]">SKU: CHM-HYPO-001</span>
</div>
</td>
<td className="px-6 py-4 text-sm">Estante A1 - Ácidos</td>
<td className="px-6 py-4 font-mono text-xs">BT-2023-X99</td>
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-bold text-sm">450 Liters</span>
<div className="w-24 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-1">
<div className="bg-green-500 h-full rounded-full" style={{ width: '80%'}}></div>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 uppercase">Optimo</span>
</td>
<td className="px-6 py-4 text-right">
<button className="text-[#617589] hover:text-primary transition-colors">
<MoreVertical className="w-5 h-5" />
</button>
</td>
</tr>
<tr className="hover:bg-gray-50 dark:hover:bg-[#212d3a] transition-colors bg-red-50/20 dark:bg-red-900/10">
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-bold text-sm text-[#111418] dark:text-white">Aluminum Sulfate</span>
<span className="text-xs text-[#617589]">SKU: COA-ALUM-442</span>
</div>
</td>
<td className="px-6 py-4 text-sm">Estante A2 - Bases</td>
<td className="px-6 py-4 font-mono text-xs">BT-2024-A12</td>
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-bold text-sm text-red-500">12 bags</span>
<div className="w-24 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-1">
<div className="bg-red-500 h-full rounded-full" style={{ width: '15%'}}></div>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 uppercase">Crítico</span>
</td>
<td className="px-6 py-4 text-right">
<button className="text-[#617589] hover:text-primary transition-colors">
<MoreVertical className="w-5 h-5" />
</button>
</td>
</tr>
<tr className="hover:bg-gray-50 dark:hover:bg-[#212d3a] transition-colors">
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-bold text-sm text-[#111418] dark:text-white">Polymer Flocculant</span>
<span className="text-xs text-[#617589]">SKU: FLOC-POLY-900</span>
</div>
</td>
<td className="px-6 py-4 text-sm">Estante B4 - Líquidos</td>
<td className="px-6 py-4 font-mono text-xs">BT-2023-Z01</td>
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-bold text-sm">80 Liters</span>
<div className="w-24 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-1">
<div className="bg-primary h-full rounded-full" style={{ width: '55%'}}></div>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 uppercase">Estable</span>
</td>
<td className="px-6 py-4 text-right">
<button className="text-[#617589] hover:text-primary transition-colors">
<MoreVertical className="w-5 h-5" />
</button>
</td>
</tr>
<tr className="hover:bg-gray-50 dark:hover:bg-[#212d3a] transition-colors">
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-bold text-sm text-[#111418] dark:text-white">Carbon Activated Filter Media</span>
<span className="text-xs text-[#617589]">SKU: MED-CARB-01</span>
</div>
</td>
<td className="px-6 py-4 text-sm">Zona de Almacenamiento a Granel</td>
<td className="px-6 py-4 font-mono text-xs">BT-2024-C88</td>
<td className="px-6 py-4">
<div className="flex flex-col">
<span className="font-bold text-sm">1,200 kg</span>
<div className="w-24 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-1">
<div className="bg-green-500 h-full rounded-full" style={{ width: '95%'}}></div>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 uppercase">Lleno</span>
</td>
<td className="px-6 py-4 text-right">
<button className="text-[#617589] hover:text-primary transition-colors">
<MoreVertical className="w-5 h-5" />
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 border-t border-[#dbe0e6] dark:border-[#2d3947] bg-background-light dark:bg-[#141d26] flex justify-between items-center">
<p className="text-xs text-[#617589] font-medium">Auditoria: Oct 24, 2023 por Operador J. Doe</p>
<div className="flex gap-2">
<button className="px-3 py-1 text-xs border border-[#dbe0e6] dark:border-[#2d3947] rounded hover:bg-white dark:hover:bg-[#2d3947]">Previous</button>
<button className="px-3 py-1 text-xs bg-primary text-white rounded">Next</button>
</div>
</div>
</div>
<div className="mt-8">
<h3 className="text-lg font-bold mb-4">Indicadores de Nivel del Tanque en Vivo</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
<div className="bg-white dark:bg-[#1a2530] p-4 rounded-xl border border-[#dbe0e6] dark:border-[#2d3947]">
<div className="flex justify-between items-end mb-4 h-32 w-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden border-2 border-gray-300 dark:border-gray-600">
<div className="absolute bottom-0 left-0 w-full bg-primary/40" style={{ height: '65%'}}></div>
<div className="absolute inset-0 flex items-center justify-center font-bold text-xs">65%</div>
</div>
<p className="text-center text-sm font-bold">Tanque T-001</p>
<p className="text-center text-[10px] text-[#617589]">Almacenamiento de Polímero</p>
</div>
<div className="bg-white dark:bg-[#1a2530] p-4 rounded-xl border border-[#dbe0e6] dark:border-[#2d3947]">
<div className="flex justify-between items-end mb-4 h-32 w-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden border-2 border-gray-300 dark:border-gray-600">
<div className="absolute bottom-0 left-0 w-full bg-red-500/40" style={{ height: '12%'}}></div>
<div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-red-600">12%</div>
</div>
<p className="text-center text-sm font-bold">Tanque T-002</p>
<p className="text-center text-[10px] text-[#617589]">Acido Sulfúrico</p>
</div>
</div>
</div>
</div>
</main>
        </Sidebar>
    )
};

export default DashboardWareHousePage;