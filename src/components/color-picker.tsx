'use client';

import { PROJECT_COLORS } from '@/config/project-colors';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (colorValue: string) => void;
}

export function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PROJECT_COLORS.map((color) => (
        <button
          key={color.name}
          type="button"
          title={color.name}
          className={cn(
            'h-8 w-8 rounded-full border-2 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            color.bgClass,
            selectedColor === color.value
              ? 'border-foreground ring-2 ring-foreground ring-offset-2'
              : 'border-transparent hover:opacity-80'
          )}
          onClick={() => onColorSelect(color.value)}
          style={{ backgroundColor: selectedColor === color.value ? undefined : color.value }} // Ensure bg is applied if not using Tailwind bg class
        >
          {selectedColor === color.value && (
            <Check className="h-5 w-5 text-white mix-blend-difference" /> // Ensure check is visible on all colors
          )}
          <span className="sr-only">{color.name}</span>
        </button>
      ))}
    </div>
  );
}
