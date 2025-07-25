"use client";

import React, { useState } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { CustomMaskedInput } from "@/components/ui/inputMasked";

type CustomFormInputProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  step?: number;
  mask?: string; // <--- ini dia tambahan utamanya
  filterInput?: (value: string) => string;
} & InputProps;

export function CustomFormInput<T extends FieldValues = FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  description,
  className,
  inputClassName,
  required = false,
  disabled = false,
  readOnly = false,
  onChange,
  maxLength,
  minLength,
  pattern,
  min,
  max,
  step,
  filterInput,
  mask,
}: CustomFormInputProps<T>) {
  const { control } = useFormContext<T>();

  const [showPassword, setShowPassword] = useState(false);

  const isSecureInput = type === "password";

  return (
    <FormField
      control={control}
      name={name as Path<T>} // force compatible
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div
              className={cn("bg-card rounded-full relative flex items-center")}
            >
              {mask ? (
                <CustomMaskedInput
                  mask={mask}
                  disabled={disabled}
                  readOnly={readOnly}
                  className={cn(
                    "bg-card flex h-9 w-full rounded-full !border border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    inputClassName
                  )}
                  placeholder={placeholder}
                  value={field.value}
                  onChange={(e) => {
                    let value = e.target.value;
                    field.onChange(value);
                    onChange?.(value);
                  }}
                />
              ) : (
                <Input
                  type={showPassword ? "text" : type}
                  placeholder={placeholder}
                  className={cn("bg-card", isSecureInput && inputClassName)}
                  disabled={disabled}
                  readOnly={readOnly}
                  maxLength={maxLength}
                  minLength={minLength}
                  min={min}
                  max={max}
                  step={step}
                  {...field}
                  onChange={(e) => {
                    let value = e.target.value;

                    if (filterInput) {
                      value = filterInput(value);
                      e.target.value = value;
                    }

                    if (pattern && !pattern.test(value)) return;

                    field.onChange(value);
                    onChange?.(value);
                  }}
                />
              )}
              {isSecureInput && (
                <button
                  type="button"
                  className="absolute right-3"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={disabled}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Filter helpers - dapat digunakan dengan filterInput prop
export const inputFilters = {
  // Hanya mengizinkan angka
  numbersOnly: (value: string) => value.replace(/[^0-9]/g, ""),

  // Mengizinkan input desimal dengan 1 digit di belakang koma (misal 123 -> 12.3)
  decimalOnly: (value: string) => {
    let clean = value.replace(/[^0-9]/g, "");

    if (!clean) return "0.0";

    if (clean.length === 1) {
      // Jika hanya 1 digit, dianggap 0.x
      return `0.${clean}`;
    } else {
      // Sisakan semua digit kecuali terakhir sebagai integer, terakhir sebagai decimal
      const intPart = clean.slice(0, -1);
      const decPart = clean.slice(-1);
      return `${Number(intPart)}.${decPart}`;
    }
  },

  // Hanya mengizinkan huruf dan spasi
  lettersOnly: (value: string) => value.replace(/[^A-Za-z\s]/g, ""),

  // Hanya mengizinkan huruf, angka, dan spasi
  alphanumeric: (value: string) => value.replace(/[^A-Za-z0-9\s]/g, ""),

  // Hanya mengizinkan huruf, angka, dan beberapa karakter khusus untuk nama file
  filename: (value: string) => value.replace(/[^A-Za-z0-9_\-\.]/g, ""),

  // Hanya mengizinkan huruf, angka, dan karakter khusus untuk email
  email: (value: string) => value.replace(/[^A-Za-z0-9@\._\-]/g, ""),

  // Hanya mengizinkan format telepon (angka, +, -, dan spasi)
  phone: (value: string) => value.replace(/[^0-9+\-\s]/g, ""),

  // Hanya mengizinkan karakter yang valid untuk URL
  url: (value: string) =>
    value.replace(/[^A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]/g, ""),
};
