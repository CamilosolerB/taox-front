"use client";

import { useState } from "react";
import { Check, Copy, Link2, Loader2, Send, Unlink } from "lucide-react";
import { useAuth, useCopilot } from "@/hooks";

export function TelegramLinkCard() {
  const { companyId } = useAuth();
  const { useTelegramStatus, useStartTelegramLink, useUnlinkTelegram } = useCopilot(companyId);

  const status = useTelegramStatus();
  const startLink = useStartTelegramLink();
  const unlink = useUnlinkTelegram();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Link2 className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-slate-800 dark:text-white">Integración con Telegram</h3>
      </div>

      {status.isLoading ? (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Loader2 size={16} className="animate-spin" /> Consultando estado...
        </div>
      ) : status.data?.linked ? (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Cuenta vinculada
            {status.data.telegram_username ? ` (@${status.data.telegram_username})` : ""} — chat ID{" "}
            <span className="font-mono">{status.data.chat_id}</span>
          </p>
          <p className="text-xs text-slate-400">
            Recibirás las alertas de stock en Telegram y podrás responder al copiloto desde allí.
          </p>
          <button
            onClick={() => unlink.mutate()}
            disabled={unlink.isPending}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20 transition-colors"
          >
            {unlink.isPending ? <Loader2 size={16} className="animate-spin" /> : <Unlink size={16} />}
            Desvincular
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Vincula tu cuenta para recibir alertas de stock y conversar con el copiloto por Telegram.
          </p>

          {startLink.data ? (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 space-y-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Código</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold text-slate-800 dark:text-white">
                    {startLink.data.code}
                  </span>
                  <button
                    onClick={() => handleCopy(startLink.data!.code)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                    title="Copiar código"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-500">{startLink.data.instructions}</p>
              {startLink.data.bot_link && (
                <a
                  href={startLink.data.bot_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-white text-sm hover:opacity-90 transition-opacity"
                >
                  <Send size={16} /> Abrir bot en Telegram
                </a>
              )}
            </div>
          ) : (
            <button
              onClick={() => startLink.mutate()}
              disabled={startLink.isPending}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {startLink.isPending ? <Loader2 size={16} className="animate-spin" /> : <Link2 size={16} />}
              Generar código de vinculación
            </button>
          )}
        </div>
      )}
    </div>
  );
}
