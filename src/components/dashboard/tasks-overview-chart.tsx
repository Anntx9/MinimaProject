'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { TaskStatus } from '@/lib/types';

interface TaskData {
  status: TaskStatus;
  count: number;
  fill: string;
}

const chartData: TaskData[] = [
  { status: 'todo', count: 18, fill: 'hsl(var(--chart-1))' }, // Primary color
  { status: 'inprogress', count: 12, fill: 'hsl(var(--chart-2))' }, // Secondary variant
  { status: 'done', count: 25, fill: 'hsl(var(--chart-3))' }, // Greenish
  { status: 'paused', count: 3, fill: 'hsl(var(--chart-4))' }, // Orange/Yellowish
];

const chartConfig = {
  count: {
    label: 'Tasks',
  },
  todo: {
    label: 'To Do',
    color: 'hsl(var(--chart-1))',
  },
  inprogress: {
    label: 'In Progress',
    color: 'hsl(var(--chart-2))',
  },
  done: {
    label: 'Done',
    color: 'hsl(var(--chart-3))',
  },
  paused: {
    label: 'Paused',
    color: 'hsl(var(--chart-4))',
  },
} satisfies import('@/components/ui/chart').ChartConfig;

export function TasksOverviewChart() {
  return (
    <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tasks Overview</CardTitle>
        <CardDescription>Current status of all tasks</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="status" />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry) => (
                   <Cell key={`cell-${entry.status}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total tasks for the last 30 days
        </div>
      </CardFooter>
    </Card>
  );
}
