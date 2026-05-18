"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Users, Palette, Activity, Settings, Moon } from "lucide-react";

const links = [
  { name: "Companies", href: "/sudo/companies", icon: Building2 },
  { name: "Users", href: "/sudo/users", icon: Users },
  { name: "Branding", href: "/sudo/branding", icon: Palette },
  { name: "System Logs", href: "/sudo/logs", icon: Activity },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-[#f0f2f4] dark:border-white/10 flex flex-col justify-between bg-white dark:bg-background-dark text-[#617589] dark:text-slate-400">
      <div>
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-[#f5f7fa] dark:bg-slate-800 flex items-center justify-center font-bold text-sm text-slate-800 dark:text-white border border-[#e3e8ee] dark:border-white/10">
            TAOX
          </div>
          <span className="font-bold text-lg text-primary">Taox Admin</span>
        </div>

        <nav className="mt-2 space-y-1 px-4">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#eef5fe] dark:bg-slate-800 text-primary font-medium"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="mt-8 mb-2 px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Settings
          </div>
          <Link
            href="/sudo/config"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <Settings className="w-5 h-5" />
            <span>Configuration</span>
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-[#f0f2f4] dark:border-white/10">
        <button className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <Moon className="w-5 h-5" />
          <span>Dark Mode</span>
        </button>
      </div>
    </aside>
  );
}
