"use client";

import { Check, ClipboardList, Loader2, X } from "lucide-react";
import { useAuth, useCopilot } from "@/hooks";

const ESTADO_LABEL: Record<string, string> = {
  pendiente_revision: "Pendiente de revisión",
  aprobado: "Aprobado",
  descartado: "Descartado",
};

export function ReplenishmentDraftsList() {
  const { companyId } = useAuth();
  const { useReplenishmentDrafts, useUpdateReplenishmentDraft } = useCopilot(companyId);

  const drafts = useReplenishmentDrafts();
  const updateDraft = useUpdateReplenishmentDraft();

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-slate-800 dark:text-white">
          Borradores de reabastecimiento
        </h3>
      </div>

      {drafts.isLoading ? (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Loader2 size={16} className="animate-spin" /> Cargando borradores...
        </div>
      ) : !drafts.data || drafts.data.length === 0 ? (
        <p className="text-sm text-slate-400">
          No hay borradores. Pídele al copiloto que prepare una reposición.
        </p>
      ) : (
        <ul className="space-y-3">
          {drafts.data.map((draft) => (
            <li
              key={draft.id_borrador}
              className="rounded-xl border border-slate-100 dark:border-slate-800 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                    {draft.codigo_producto}
                    {draft.cantidad_sugerida != null && (
                      <span className="font-normal text-slate-500">
                        {" "}
                        — {draft.cantidad_sugerida} {draft.unidad_medida ?? ""}
                      </span>
                    )}
                  </p>
                  {draft.proveedor_sugerido && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      Proveedor: {draft.proveedor_sugerido}
                    </p>
                  )}
                  {draft.notas && (
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{draft.notas}</p>
                  )}
                  <span className="inline-block mt-2 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {ESTADO_LABEL[draft.estado] ?? draft.estado}
                  </span>
                </div>

                {draft.estado === "pendiente_revision" && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() =>
                        updateDraft.mutate({ idBorrador: draft.id_borrador, body: { estado: "aprobado" } })
                      }
                      className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                      title="Aprobar"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() =>
                        updateDraft.mutate({ idBorrador: draft.id_borrador, body: { estado: "descartado" } })
                      }
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Descartar"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
