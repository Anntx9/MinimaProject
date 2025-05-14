import { Clock, CheckCircle, ListTodo, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { StatsCard } from '@/components/dashboard/stats-card';
import { TasksOverviewChart } from '@/components/dashboard/tasks-overview-chart';
import { mockTasks, mockUsers } from '@/lib/data'; // Assuming currentUser is needed

// Dummy data aggregation
const currentUser = mockUsers[0]; // Assume current user is Alice
const upcomingTasks = mockTasks.filter(
  task => task.assigneeIds?.includes(currentUser.id) && task.status !== 'done' && new Date(task.dueDate || 0) > new Date()
).length;
const completedTasks = mockTasks.filter(
    task => task.assigneeIds?.includes(currentUser.id) && task.status === 'done'
).length;
const overdueTasks = mockTasks.filter(
  task => task.assigneeIds?.includes(currentUser.id) && task.status !== 'done' && new Date(task.dueDate || 0) < new Date()
).length;


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard"
        description={`Welcome back, ${currentUser.displayName || 'User'}! Here's a quick overview.`}
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Upcoming Tasks"
          value={upcomingTasks}
          icon={Clock}
          description="Tasks due soon"
          colorClass="text-blue-500"
        />
        <StatsCard
          title="Completed Tasks"
          value={completedTasks}
          icon={CheckCircle}
          description="Tasks finished recently"
          colorClass="text-green-500"
        />
        <StatsCard
          title="Total Active Tasks"
          value={mockTasks.filter(t => t.status !== 'done').length}
          icon={ListTodo}
          description="Across all projects"
        />
         <StatsCard
          title="Overdue Tasks"
          value={overdueTasks}
          icon={AlertTriangle}
          description="Require immediate attention"
          colorClass="text-red-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        {/* For a single column layout for the chart or span across columns */}
        <TasksOverviewChart />
        {/* Additional charts or components can be added here */}
      </div>
    </div>
  );
}
