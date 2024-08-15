import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Column from "../../components/Column";
import { Board, Column as ColumnType } from "../../types";
import { Button } from "@/components/ui/button";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function BoardPage() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: board,
    isLoading,
    refetch,
  } = trpc.board.getById.useQuery({
    id: id as string,
  });
  const [boardState, setBoardState] = useState<Board | null>(null);
  const addCardMutation = trpc.card.create.useMutation();
  const updateCardOrderMutation = trpc.card.updateCardOrder.useMutation();
  const deleteCardMutation = trpc.card.deleteCard.useMutation();
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (board) {
      setBoardState(board);
    }
  }, [board]);

  const handleAddCard = async () => {
    if (activeColumn) {
      await addCardMutation.mutateAsync({
        columnId: activeColumn,
        title: newCardTitle,
        description: newCardDescription,
      });
      setNewCardTitle("");
      setNewCardDescription("");
      setIsDialogOpen(false);
      refetch();
      toast({
        title: "Card added",
        description: "Your new card has been added successfully.",
      });
    }
  };

  const handleDeleteCard = (cardId: string) => {
    setCardToDelete(cardId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCard = async () => {
    if (cardToDelete) {
      try {
        await deleteCardMutation.mutateAsync({ cardId: cardToDelete });
        setBoardState((prevState) => {
          if (!prevState) return null;
          return {
            ...prevState,
            columns: prevState.columns.map((column) => ({
              ...column,
              cards: column.cards.filter((card) => card.id !== cardToDelete),
            })),
          };
        });

        refetch();
        setIsDeleteDialogOpen(false);
        setCardToDelete(null);
        toast({
          title: "Card deleted",
          description: "The card has been deleted successfully.",
        });
      } catch (error) {
        console.error("Failed to delete card:", error);
        toast({
          title: "Error",
          description: "Failed to delete the card. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const updatedBoard = JSON.parse(JSON.stringify(boardState));
    const sourceColumn = updatedBoard.columns.find(
      (col: ColumnType) => col.id === source.droppableId
    );
    const destColumn = updatedBoard.columns.find(
      (col: ColumnType) => col.id === destination.droppableId
    );
    const [movedCard] = sourceColumn.cards.splice(source.index, 1);
    destColumn.cards.splice(destination.index, 0, movedCard);

    setBoardState(updatedBoard);

    await updateCardOrderMutation.mutateAsync({
      cardId: result.draggableId,
      newColumnId: destination.droppableId,
      newOrder: destination.index,
    });

    refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (!board) return <div>Board not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-4 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{board.name}</h1>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
          {board.columns.map((column: ColumnType) => (
            <Column
              key={column.id}
              column={column}
              onAddCard={() => {
                setActiveColumn(column.id);
                setIsDialogOpen(true);
              }}
              onDeleteCard={handleDeleteCard}
              showAddCard={column.name.toLowerCase() === "to do"}
            />
          ))}
        </div>
      </DragDropContext>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
            <DialogDescription>
              Enter the details for your new card.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Card Title"
            />
            <Textarea
              value={newCardDescription}
              onChange={(e) => setNewCardDescription(e.target.value)}
              placeholder="Card Description"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddCard} className="rounded-md">
              Add Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Card</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this card? This action cannot be
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
            <Button variant="destructive" onClick={confirmDeleteCard}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
