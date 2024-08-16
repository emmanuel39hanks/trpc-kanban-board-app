import { trpc } from "@/utils/trpc";
import { TimedTaskItem } from "./TimedTaskItem";

export function TimedTaskList() {
  const { data: tasks, isLoading } = trpc.timedTask.getAll.useQuery();

  if (isLoading) return <div>Loading tasks...</div>;

  return (
    <div className="space-y-4">
      {tasks?.map((task) => (
        <TimedTaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}