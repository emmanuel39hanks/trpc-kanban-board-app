import { Card as CardType } from "../types";
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CardProps {
  card: CardType;
  onDelete: () => void;
}

export default function Card({ card, onDelete }: CardProps) {
  return (
    <ShadcnCard className="mb-2 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.description && (
              <CardDescription className="text-xs mt-1">
                {card.description}
              </CardDescription>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-3 w-3 text-gray-500" />
          </Button>
        </div>
      </CardHeader>
    </ShadcnCard>
  );
}
