"use client";

import { useState } from "react";
import { Bot, MessageSquare, Plus } from "lucide-react";
import { useAuth, useCopilot } from "@/hooks";
import { CopilotChat, ReplenishmentDraftsList, TelegramLinkCard } from "@/components/adminInventory/copilot";

export default function AssistantPage() {
  const { companyId } = useAuth();
  const { useConversations } = useCopilot(companyId);
  const conversations = useConversations();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [chatKey, setChatKey] = useState(0);

  const startNewConversation = () => {
    setSelectedId(null);
    setChatKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Asistente TAOX</h1>
          <p className="text-sm text-slate-500">
            Consulta alertas de stock y prepara reposiciones. Integrado con Telegram.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations list */}
        <div className="lg:col-span-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <MessageSquare size={18} /> Conversaciones
            </h2>
            <button
              onClick={startNewConversation}
              className="p-1.5 rounded-lg text-primary hover:bg-primary/10"
              title="Nueva conversación"
            >
              <Plus size={18} />
            </button>
          </div>

          {conversations.isLoading ? (
            <p className="text-sm text-slate-400">Cargando...</p>
          ) : !conversations.data || conversations.data.length === 0 ? (
            <p className="text-sm text-slate-400">Aún no hay conversaciones.</p>
          ) : (
            <ul className="space-y-1.5 max-h-[420px] overflow-y-auto">
              {conversations.data.map((conversation) => (
                <li key={conversation.id_conversation}>
                  <button
                    onClick={() => setSelectedId(conversation.id_conversation)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                      selectedId === conversation.id_conversation
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <span className="block truncate">
                      {conversation.titulo || conversation.codigo_producto || "Conversación"}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-slate-400">
                      {conversation.canal}
                      {conversation.alerta_id ? ` · alerta #${conversation.alerta_id}` : ""}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chat */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 h-[600px]">
          <CopilotChat
            key={`${selectedId ?? "new"}-${chatKey}`}
            conversationId={selectedId}
            onConversationChange={(id) => setSelectedId(id)}
            className="h-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TelegramLinkCard />
        <ReplenishmentDraftsList />
      </div>
    </div>
  );
}
