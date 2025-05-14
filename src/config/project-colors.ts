import type { ProjectColor } from '@/lib/types';

export const PROJECT_COLORS: ProjectColor[] = [
  { name: 'Teal', value: 'hsl(170 70% 50%)', bgClass: 'bg-teal-500', textClass: 'text-teal-500' },
  { name: 'Blue', value: 'hsl(210 85% 65%)', bgClass: 'bg-blue-500', textClass: 'text-blue-500' },
  { name: 'Purple', value: 'hsl(260 70% 70%)', bgClass: 'bg-purple-500', textClass: 'text-purple-500' },
  { name: 'Pink', value: 'hsl(330 80% 70%)', bgClass: 'bg-pink-500', textClass: 'text-pink-500' },
  { name: 'Red', value: 'hsl(0 78% 60%)', bgClass: 'bg-red-500', textClass: 'text-red-500' },
  { name: 'Orange', value: 'hsl(30 88% 60%)', bgClass: 'bg-orange-500', textClass: 'text-orange-500' },
  { name: 'Yellow', value: 'hsl(45 90% 55%)', bgClass: 'bg-yellow-500', textClass: 'text-yellow-500' },
  { name: 'Green', value: 'hsl(130 65% 55%)', bgClass: 'bg-green-500', textClass: 'text-green-500' },
  { name: 'Gray', value: 'hsl(210 15% 65%)', bgClass: 'bg-gray-500', textClass: 'text-gray-500' },
];

export const DEFAULT_PROJECT_COLOR = PROJECT_COLORS[0];
