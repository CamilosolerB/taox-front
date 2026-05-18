"use client";

import { useState, useCallback, useRef } from "react";
import { Modal } from "@/components/utils/Modal";
import { PrimaryButton } from "@/components/utils";
import { useInventory } from "@/hooks";
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import type { BulkUploadResult } from "@/api/endpoints/products";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
}

export const BulkUploadModal = ({
  isOpen,
  onClose,
  companyId,
}: BulkUploadModalProps) => {
  const { useDownloadBulkTemplate, useBulkUpload } = useInventory(companyId);
  const downloadTemplateMutation = useDownloadBulkTemplate();
  const bulkUploadMutation = useBulkUpload();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState<BulkUploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetState = useCallback(() => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  const handleFileSelect = useCallback((file: File) => {
    setError(null);
    setResult(null);

    if (
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls")
    ) {
      setError("Solo se aceptan archivos Excel (.xlsx)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("El archivo no debe superar los 10 MB");
      return;
    }

    setSelectedFile(file);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;
    setError(null);
    setResult(null);

    try {
      const res = await bulkUploadMutation.mutateAsync(selectedFile);
      setResult(res);
      setSelectedFile(null);
    } catch (err: unknown) {
      let msg = "Error al subir el archivo";
      if (err && typeof err === "object" && "response" in err) {
        const resp = (err as { response?: { data?: { detail?: string } } }).response;
        if (resp?.data?.detail) msg = resp.data.detail;
      }
      setError(msg);
    }
  }, [selectedFile, bulkUploadMutation]);

  const handleDownloadTemplate = useCallback(() => {
    downloadTemplateMutation.mutate();
  }, [downloadTemplateMutation]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Importar Productos" size="xl">
      <div className="space-y-6">
        {/* Step 1: Download template */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/40">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <FileSpreadsheet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Paso 1: Descarga la plantilla
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Descarga la plantilla Excel con las columnas requeridas. Llénala con los
                datos de tus productos y luego súbela.
              </p>
              <button
                type="button"
                onClick={handleDownloadTemplate}
                disabled={downloadTemplateMutation.isPending}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                {downloadTemplateMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Descargar Plantilla
              </button>
            </div>
          </div>
        </div>

        {/* Step 2: Upload file */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4 text-emerald-500" />
            Paso 2: Sube tu archivo
          </h3>

          {/* Drop zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
              dragActive
                ? "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20"
                : selectedFile
                ? "border-emerald-300 bg-emerald-50/30 dark:bg-emerald-900/10"
                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleInputChange}
              className="hidden"
            />

            {selectedFile ? (
              <div className="flex items-center justify-center gap-3">
                <FileSpreadsheet className="w-8 h-8 text-emerald-500" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="ml-2 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Arrastra tu archivo aquí o{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    haz clic para seleccionar
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-1">Solo archivos .xlsx (máx 10 MB)</p>
              </>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Upload result */}
        {result && (
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 overflow-hidden">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  {result.message}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {result.created} de {result.total_rows} filas procesadas exitosamente
                </p>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="p-4 border-t border-emerald-200 dark:border-emerald-800/40 max-h-40 overflow-y-auto">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Errores ({result.errors.length}):
                </p>
                <div className="space-y-1">
                  {result.errors.map((err, i) => (
                    <div
                      key={i}
                      className="flex gap-2 text-xs text-red-600 dark:text-red-400"
                    >
                      <span className="font-mono font-bold flex-shrink-0">
                        Fila {err.row}:
                      </span>
                      <span>{err.error}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cerrar
          </button>
          <div className="flex-1">
            <PrimaryButton
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || bulkUploadMutation.isPending}
            >
              {bulkUploadMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Procesando…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Importar Productos
                </span>
              )}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
