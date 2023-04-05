import React from 'react';
import { Card } from './Card';
import { Draggable } from 'react-beautiful-dnd';

interface CardProps {
  id: string;
  title: string;
  email: string;
  phone: string | null;
  company: string | null;
  updatedAt: string;
  contactId: number;
}
interface Contact {
  updatedAt: any;
  id: number;
  type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  location: string | null;
  status: string;
  column: string;
  position: number;
}
interface ColumnProps {
  id: string;
  title: string;
  cards: CardProps[];
  onContactTypeChange?: (contactId: number, newType: string) => void;
}
const Column: React.FC<ColumnProps> = ({ cards }) => {
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
                contactId={parseInt(card.id)}
                key={card.id}
                id={card.id}
                title={card.title}
                email={card.email}
                phone={card.phone}
                company={card.company}
                updatedAt={card.updatedAt}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export { Column };
