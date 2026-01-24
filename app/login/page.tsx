import { HeaderLogin, TopForm } from "@/components/login/index";
import { Verified } from "lucide-react";
import { ControlAdminForm } from "@/components/login/Forms";

const LoginPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      <HeaderLogin />
      <main
        className="flex-1 flex items-center justify-center relative p-6 bg-water-overlay"
        data-alt="Industrial water treatment plant facility in soft focus"
      >
        <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <TopForm />
          <div className="px-8 py-6 space-y-4">
            <ControlAdminForm />
            <div className="flex items-center justify-center gap-2 text-[#617589] dark:text-slate-500 pt-4">
              <Verified className="text-sm" />
              <p className="text-[12px] font-medium tracking-wide">
                Enterprise Grade Security &amp; Encryption
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 px-10 text-center text-sm text-[#617589] dark:text-slate-500 bg-white dark:bg-background-dark border-t border-[#f0f2f4] dark:border-white/10">
        <p>Administra tu invetario y tus flujos.</p>
      </footer>
    </div>
  );
};
export default LoginPage;
