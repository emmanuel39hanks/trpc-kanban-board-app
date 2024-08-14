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

export default function Home() {
  const { data: boards, isLoading, refetch } = trpc.board.getAll.useQuery();
  const createBoardMutation = trpc.board.create.useMutation();
  const deleteBoardMutation = trpc.board.deleteBoard.useMutation();
  const [newBoardName, setNewBoardName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateBoard = async () => {
    await createBoardMutation.mutateAsync({ name: newBoardName });
    setNewBoardName("");
    setIsDialogOpen(false);
    refetch();
  };

  const handleDeleteBoard = async (id: string) => {
    await deleteBoardMutation.mutateAsync({ id });
    refetch();
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading...</p>
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
          <Button onClick={() => setIsDialogOpen(true)} className="rounded-md mt-4">
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
    </div>
  );
}
