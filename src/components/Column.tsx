import { Column as ColumnType } from "../types";
import Card from "./Card";
import { Button } from "@/components/ui/button";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

interface ColumnProps {
  column: ColumnType;
  onAddCard: () => void;
  onDeleteCard: (cardId: string) => void;
  showAddCard: boolean;
  isLoading: boolean;
}

const Column = memo(({ column, onAddCard, onDeleteCard, showAddCard, isLoading }: ColumnProps) => {
  if (isLoading) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg min-w-[350px] max-w-[350px] w-full shadow-md">
        <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
        <div className="space-y-2">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg min-w-[350px] max-w-[350px] w-full shadow-md flex flex-col h-[calc(100vh-200px)]">
      <h2 className="text-lg font-semibold mb-4 text-center">{column.name}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2 flex-grow overflow-y-auto"
          >
            {column.cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card card={card} onDelete={() => onDeleteCard(card.id)} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {showAddCard && (
        <Button
          variant="ghost"
          className="w-full mt-4 flex items-center justify-center hover:bg-gray-200 rounded-md"
          onClick={onAddCard}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      )}
    </div>
  );
}, areEqual);

function areEqual(prevProps: ColumnProps, nextProps: ColumnProps) {
  return prevProps.column.id === nextProps.column.id &&
    prevProps.column.cards.length === nextProps.column.cards.length &&
    prevProps.column.cards.every((card, index) => card.id === nextProps.column.cards[index].id);
}

export default Column;