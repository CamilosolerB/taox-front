"use client";
import { useState } from "react";
import { LoginAdminForm, LoginForm } from "./";

export const ControlAdminForm = () => {
  const [activeTab, setActiveTab] = useState(false);

  return (
    <>
      <div className="mt-6">
        <div className="flex border-b border-[#dbe0e6] dark:border-white/10 px-8 gap-8">
          <button
            className={`flex flex-col items-center justify-center border-b-[3px] border-${activeTab ? "transparent" : "primary"} text-${activeTab ? "secondary" : "primary"} pb-[13px] pt-4 transition-all`}
            onClick={() => setActiveTab(false)}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Acceso empresas
            </p>
          </button>
          <button
            className={`flex flex-col items-center justify-center border-b-[3px] border-${activeTab ? "primary" : "transparent"} text-${activeTab ? "primary" : "secondary"} pb-[13px] pt-4 hover:text-${activeTab ? "primary" : "secondary"} transition-all`}
            onClick={() => setActiveTab(true)}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Acceso administrador
            </p>
          </button>
        </div>
      </div>
      {activeTab ? <LoginAdminForm /> : <LoginForm />}
    </>
  );
};
