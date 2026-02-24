"use client";

import { LucideIcon, EyeOff, EyeIcon } from "lucide-react";
import { useState } from "react";

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  step?: string;
  required?: boolean;
}

export const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  icon: Icon,
  disabled = false,
  step,
  required = false,
}: InputProps) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputType =
    type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-white text-sm font-semibold leading-normal pb-1">
          {label}
        </p>

        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          )}

          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg
              text-[#111418] dark:text-white dark:bg-slate-800 border border-[#dbe0e6]
              dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-primary
              h-12 placeholder:text-[#617589] pl-2 pr-2 text-base font-normal leading-normal
              disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed dark:disabled:bg-slate-700/50"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={inputType}
            disabled={disabled}
            step={step}
            required={required}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={handlePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {isPasswordVisible ? <EyeOff /> : <EyeIcon />}
            </button>
          )}
        </div>
      </label>
    </div>
  );
};
