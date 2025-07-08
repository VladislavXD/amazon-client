"use client";

import React from "react";

interface ColorOption {
  label: string;
  value: string; // hex
  image?: string; // optional image
}

interface ColorRadioGroupProps {
  options: ColorOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function ColorRadioGroup({
  options,
  value,
  onChange,
}: ColorRadioGroupProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-8 h-8 rounded-full  transition-all duration-200
              ${isSelected ? "ring-4 ring-blue-800 border-transparent" : "border-gray-300"}
            `}
            style={{
              backgroundColor: option.image ? undefined : option.value,
              backgroundImage: option.image ? `url(${option.image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label={option.label}
          />
        );
      })}
    </div>
  );
}
