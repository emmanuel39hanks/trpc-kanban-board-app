import { trpc } from "@/utils/trpc";
import { TimedTaskItem } from "./TimedTaskItem";
import { Skeleton } from "@/components/ui/skeleton";

export function TimedTaskList() {
  const { data: tasks, isLoading } = trpc.timedTask.getAll.useQuery(
    undefined,
    { refetchInterval: 1000 } 
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="w-full h-20" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks?.map((task) => (
        <TimedTaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
