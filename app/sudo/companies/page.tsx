"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useCompanies } from "@/hooks";
import CreateCompanyModal from "@/components/sudo/CreateCompanyModal";
import EditCompanyModal from "@/components/sudo/EditCompanyModal";
import type { CompanyDTO } from "@/api/types";

export default function SudoCompaniesPage() {
  const { useGetCompanies, useDeleteCompany } = useCompanies();
  const { data: companies, isLoading } = useGetCompanies();
  const deleteMutation = useDeleteCompany();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente a "${name}"?`)) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (e) {
        console.error("Error al eliminar", e);
        alert("Ocurrió un error al eliminar la empresa.");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Company Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Administra todas las empresas (Tenants) suscritas a la plataforma.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-primary hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-primary/30"
        >
          <Plus className="w-4 h-4" />
          <span>New Company</span>
        </button>
      </div>

      <div className="bg-white dark:bg-background-dark border border-[#f0f2f4] dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-[#f0f2f4] dark:border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Company Name</th>
                <th className="px-6 py-4 font-semibold">NIT</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f4] dark:divide-white/10">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Cargando empresas...
                  </td>
                </tr>
              ) : companies?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No hay empresas registradas
                  </td>
                </tr>
              ) : (
                companies?.map((company) => (
                  <tr
                    key={company.id_company}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-6 py-4 flex items-center space-x-3">
                      {company.logo ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                          <img src={`http://127.0.0.1:8000${company.logo}`} alt={company.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-500 uppercase">
                          {company.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {company.name}
                        </div>
                        <div className="text-xs text-slate-500">{company.address}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {company.nit}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 dark:text-slate-400">{company.email}</div>
                      <div className="text-xs text-slate-500">{company.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      {company.is_active ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
                          SUSPENDED
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCompany(company);
                          setIsEditModalOpen(true);
                        }}
                        className="text-slate-400 hover:text-primary transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(company.id_company, company.name)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateCompanyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditCompanyModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCompany(null);
        }} 
        company={selectedCompany} 
      />
    </div>
  );
}
