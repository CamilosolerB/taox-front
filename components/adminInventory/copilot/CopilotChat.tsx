"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, User as UserIcon } from "lucide-react";
import { useAuth, useCopilot } from "@/hooks";
import type { CopilotMessageDTO, ReplenishmentDraftDTO } from "@/interfaces/types";

interface CopilotChatProps {
  conversationId?: string | null;
  codigoProducto?: string | null;
  alertaId?: number | null;
  onConversationChange?: (id: string) => void;
  onDraftCreated?: (draft: ReplenishmentDraftDTO) => void;
  className?: string;
}

export function CopilotChat({
  conversationId = null,
  codigoProducto = null,
  alertaId = null,
  onConversationChange,
  onDraftCreated,
  className = "",
}: CopilotChatProps) {
  const { companyId } = useAuth();
  const { useMessages, useSendMessage, useSendChatMessage } = useCopilot(companyId);

  const [activeId, setActiveId] = useState<string | null>(conversationId);
  const [messages, setMessages] = useState<CopilotMessageDTO[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const history = useMessages(activeId);
  const sendExisting = useSendMessage();
  const sendNew = useSendChatMessage();

  useEffect(() => {
    setActiveId(conversationId ?? null);
  }, [conversationId]);

  useEffect(() => {
    if (history.data) setMessages(history.data);
  }, [history.data]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setError(null);
    setInput("");
    setSending(true);

    const optimistic: CopilotMessageDTO = {
      id_mensaje: -Date.now(),
      rol: "user",
      contenido: text,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      if (activeId) {
        const res = await sendExisting.mutateAsync({
          conversationId: activeId,
          body: { contenido: text },
        });
        if (res.replenishment_draft) onDraftCreated?.(res.replenishment_draft);
      } else {
        const res = await sendNew.mutateAsync({
          contenido: text,
          codigo_producto: codigoProducto,
          alerta_id: alertaId,
        });
        setActiveId(res.conversation_id);
        onConversationChange?.(res.conversation_id);
        if (res.replenishment_draft) onDraftCreated?.(res.replenishment_draft);
      }
    } catch {
      setError("No se pudo enviar el mensaje. Intenta de nuevo.");
      setMessages((prev) => prev.filter((m) => m.id_mensaje !== optimistic.id_mensaje));
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-slate-900 ${className}`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !sending && (
          <div className="text-center text-slate-400 dark:text-slate-500 text-sm py-10">
            <Bot className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="font-medium">Soy el copiloto de TAOX.</p>
            <p className="mt-1">
              Pregúntame por las alertas de stock o pídeme preparar una reposición.
            </p>
          </div>
        )}

        {messages.map((message) => {
          const isUser = message.rol === "user";
          return (
            <div
              key={message.id_mensaje}
              className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isUser ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                {isUser ? <UserIcon size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words ${
                  isUser
                    ? "bg-primary text-white rounded-tr-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm"
                }`}
              >
                {message.contenido}
              </div>
            </div>
          );
        })}

        {sending && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-slate-600 dark:text-slate-300" />
            </div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-slate-100 dark:bg-slate-800">
              <Loader2 size={16} className="animate-spin text-slate-500" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {error && (
        <div className="px-4 py-2 text-xs text-red-500 bg-red-50 dark:bg-red-900/20">{error}</div>
      )}

      <div className="border-t border-slate-200 dark:border-slate-800 p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Escribe un mensaje al copiloto..."
            className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/40 max-h-32"
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="p-2.5 rounded-xl bg-primary text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
            title="Enviar"
          >
            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
