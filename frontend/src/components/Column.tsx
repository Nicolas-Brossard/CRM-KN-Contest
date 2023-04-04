import React from 'react';
import { Card } from './Card';
import { Draggable } from 'react-beautiful-dnd';

interface CardProps {
  id: string;
  title: string;
  email: string;
  phone: string | null;
}

interface ColumnProps {
  id: string;
  title: string;
  cards: CardProps[];
  onContactTypeChange?: (contactId: number, newType: string) => void;
}
const Column: React.FC<ColumnProps> = ({
  id,
  title,
  cards,
  onContactTypeChange,
}) => {
  return (
    <>
      {cards.map((card, index) => (
        <Draggable key={card.id} draggableId={card.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                email={card.email}
                phone={card.phone}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export { Column };
