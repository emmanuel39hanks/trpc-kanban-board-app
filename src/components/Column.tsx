import { Column as ColumnType } from "../types";
import Card from "./Card";
import { Button } from "@/components/ui/button";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";

interface ColumnProps {
  column: ColumnType;
  onAddCard: () => void;
  onDeleteCard: (cardId: string) => void;
  showAddCard: boolean;
}

export default function Column({
  column,
  onAddCard,
  onDeleteCard,
  showAddCard,
}: ColumnProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg min-w-[350px] max-w-[350px] w-full shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">{column.name}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2 min-h-[200px]"
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
}
