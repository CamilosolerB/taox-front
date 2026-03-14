"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, X } from "lucide-react";

export interface SearchSelectOption {
  id: string | number;
  label: string;
  description?: string;
}

interface SearchSelectProps {
  label: string;
  placeholder?: string;
  options: SearchSelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  isLoading?: boolean;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const SearchSelect = ({
  label,
  placeholder = "Buscar...",
  options,
  value,
  onChange,
  isLoading = false,
  error,
  required = false,
  disabled = false,
}: SearchSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use useMemo to avoid unnecessary recalculations
  const filteredOptions: SearchSelectOption[] = useMemo(() => {
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.id === value);

  const handleSelect = (optionId: string | number) => {
    onChange(optionId);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSearchTerm("");
  };

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-lg text-left flex items-center justify-between transition-all ${
            error
              ? "border-red-500 dark:border-red-400"
              : isOpen
                ? "border-primary ring-2 ring-primary/20"
                : "border-gray-300 dark:border-gray-600"
          } ${
            disabled
              ? "bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
          }`}
        >
          <span
            className={`text-sm flex-1 truncate ${
              selectedOption
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {selectedOption && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="max-h-48 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Cargando...
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  {options.length === 0 ? "No hay opciones disponibles" : "No se encontraron resultados"}
                </div>
              ) : (
                <ul className="py-1">
                  {filteredOptions.map((option) => (
                    <li key={option.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(option.id)}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-2 ${
                          value === option.id
                            ? "bg-blue-100 dark:bg-blue-900/50 text-primary font-medium"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {option.description}
                            </div>
                          )}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
