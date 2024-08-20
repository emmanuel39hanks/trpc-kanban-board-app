import { trpc } from "../../utils/trpc";
import Link from "next/link";
import { BoardSummary } from "../../types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: boards, isLoading, refetch } = trpc.board.getAll.useQuery();
  const createBoardMutation = trpc.board.create.useMutation();
  const deleteBoardMutation = trpc.board.deleteBoard.useMutation();
  const [newBoardName, setNewBoardName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateBoard = async () => {
    await createBoardMutation.mutateAsync({ name: newBoardName });
    setNewBoardName("");
    setIsDialogOpen(false);
    refetch();
    toast({
      title: "Board created",
      description: "Your new board has been created successfully.",
    });
  };

  const handleDeleteBoard = (id: string) => {
    setBoardToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteBoard = async () => {
    if (boardToDelete) {
      await deleteBoardMutation.mutateAsync({ id: boardToDelete });
      refetch();
      setIsDeleteDialogOpen(false);
      setBoardToDelete(null);
      toast({
        title: "Board deleted",
        description: "The board has been deleted successfully.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="h-40 w-full" />
          ))}
        </div>
      ) : boards && boards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {boards.map((board: BoardSummary) => (
            <Card
              key={board.id}
              className="hover:shadow-md transition-all duration-300 bg-white"
            >
              <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">
                    {board.name}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteBoard(board.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
                <CardDescription className="text-xs text-gray-500 mt-1">
                  Created: {new Date(board.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <Link href={`/boards/${board.id}`} passHref className="w-full">
                  <Button className="w-full rounded-md text-sm">
                    View Board
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl mt-14">
            Hmm... Seems we have no boards. Let's create some!
          </p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="rounded-md mt-4"
          >
            Create Your First Board
          </Button>
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
            <DialogDescription>
              Enter a name for your new Kanban board.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Board Name"
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleCreateBoard} className="rounded-md">
              Create Board
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Board</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this board? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteBoard}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
