import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TimedTask } from "@prisma/client";
import { Check, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TimedTaskItemProps {
  task: TimedTask & { timeLeft: number };
}

export function TimedTaskItem({ task }: TimedTaskItemProps) {
  const [timeLeft, setTimeLeft] = useState(task.timeLeft);
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const completeTask = trpc.timedTask.complete.useMutation({
    onSuccess: () => {
      utils.timedTask.getAll.invalidate();
      toast({
        title: "Task completed",
        description: "Your timed task has been marked as complete.",
      });
    },
  });

  const deleteTask = trpc.timedTask.delete.useMutation({
    onSuccess: () => {
      utils.timedTask.getAll.invalidate();
      toast({
        title: "Task deleted",
        description: "Your timed task has been deleted.",
      });
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          toast({
            title: "Time's up!",
            description: `Time's up for task: ${task.title}`,
          });
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [task.title, toast]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleComplete = () => {
    completeTask.mutate({ id: task.id });
  };

  const handleDelete = () => {
    deleteTask.mutate({ id: task.id });
  };

  const isExpired = timeLeft <= 0;

  return (
    <div
      className={`flex flex-col p-4 bg-white border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md ${
        isExpired ? "border-red-500" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-2 mr-2">
        {task.title ? (
          <span
            className={`font-semibold text-sm ${
              isExpired ? "text-red-500" : "text-gray-800"
            } truncate max-w-[200px]`}
          >
            {task.title}
          </span>
        ) : (
          <Skeleton className="h-4 w-32" />
        )}
        {timeLeft !== undefined ? (
          <span
            className={`text-sm ${
              isExpired ? "text-red-500" : "text-gray-500"
            } whitespace-nowrap`}
          >
            {formatTime(timeLeft)}
          </span>
        ) : (
          <Skeleton className="h-4 w-16" />
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full hover:bg-gray-100 transition-colors duration-200"
          onClick={handleComplete}
          disabled={isExpired}
        >
          <Check className="h-4 w-4 text-green-500" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full hover:bg-gray-100 transition-colors duration-200"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    </div>
  );
}