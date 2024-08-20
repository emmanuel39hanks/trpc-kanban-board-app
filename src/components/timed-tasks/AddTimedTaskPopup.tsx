import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Mic } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";

interface AddTimedTaskPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTimedTaskPopup({
  open,
  onOpenChange,
}: AddTimedTaskPopupProps) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const createTask = trpc.timedTask.create.useMutation({
    onSuccess: () => {
      utils.timedTask.getAll.invalidate();
      toast({
        title: "Task created",
        description: "Your timed task has been created.",
      });
      setTitle("");
      setDuration("");
      onOpenChange(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && duration) {
      createTask.mutate({ title, duration: parseInt(duration) });
    }
  };

  const handleVoiceInput = (taskTitle: string, taskDuration: number) => {
    setTitle(taskTitle);
    setDuration(taskDuration.toString());
    setIsRecording(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Timed Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setIsRecording(true)}
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          <Input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <DialogFooter>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
        {isRecording && (
          <VoiceRecorder
            onRecordingComplete={(taskTitle, taskDuration) => {
              handleVoiceInput(taskTitle, taskDuration);
              setIsRecording(false);
            }}
            onClose={() => setIsRecording(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
