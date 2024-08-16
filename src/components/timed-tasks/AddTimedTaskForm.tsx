import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function AddTimedTaskForm() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const { toast } = useToast();
  const utils = trpc.useContext();

  const createTask = trpc.timedTask.create.useMutation({
    onSuccess: () => {
      utils.timedTask.getAll.invalidate();
      toast({
        title: "Task created",
        description: "Your timed task has been created.",
      });
      setTitle("");
      setDuration("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && duration) {
      createTask.mutate({ title, duration: parseInt(duration) });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Add Task
      </Button>
    </form>
  );
}
