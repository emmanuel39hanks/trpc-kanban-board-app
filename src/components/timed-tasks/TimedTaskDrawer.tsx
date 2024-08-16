import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlarmClockPlus, Plus } from "lucide-react";
import { TimedTaskList } from "./TimedTaskList";
import { AddTimedTaskPopup } from "./AddTimedTaskPopup";

export function TimedTaskDrawer() {
  const [open, setOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="mx-2">
          <AlarmClockPlus className="h-[1.2rem] w-[1.2rem]" /> <span className="ml-2">Tasks</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Timed Tasks</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <Button onClick={() => setIsAddTaskOpen(true)} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </Button>
          <TimedTaskList />
        </div>
        <AddTimedTaskPopup open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
      </SheetContent>
    </Sheet>
  );
}