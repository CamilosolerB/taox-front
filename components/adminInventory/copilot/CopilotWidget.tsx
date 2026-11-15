"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";
import { CopilotChat } from "./CopilotChat";

export function CopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[70vh] max-h-[560px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-900">
            <div className="flex items-center gap-2 text-white">
              <Bot size={18} />
              <span className="font-semibold text-sm">Copiloto TAOX</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-300 hover:bg-slate-800"
              title="Cerrar"
            >
              <X size={18} />
            </button>
          </div>
          <CopilotChat className="flex-1 min-h-0" />
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:opacity-90 transition-opacity"
        title="Abrir copiloto"
      >
        {isOpen ? <X size={22} /> : <Bot size={24} />}
      </button>
    </>
  );
}
