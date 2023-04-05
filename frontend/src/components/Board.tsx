import React, { useState, useEffect, useRef } from 'react';
import { Column } from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import jwt_decode from 'jwt-decode';
import { Divider } from '@mui/material';
import { width } from '@mui/system';

interface ColumnData {
  id: string;
  items: {
    id: string;
    title: string;
    email: string;
    phone: string | null;
    company: string | null;
    updatedAt: string;
    contactId: number;
  }[];
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

interface BoardProps {
  contacts: Contact[];
  onContactTypeChange: (contactId: number, newType: string) => void;
  onColumnChange: (contactId: number, newColumn: string) => void; // Ajoutez cette ligne
}

async function updateCard(
  contactId: number,
  newType: string,
  newPosition: number
) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/contact/${contactId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: newType, position: newPosition }),
      }
    );

    if (response.ok) {
      console.log('Card updated successfully');
    } else {
      console.error('Error updating the card');
    }
  } catch (error) {
    console.error('Error while updating the card:', error);
  }
}

function groupContactsByType(contacts: Contact[]): ColumnData[] {
  const desiredColumnIds = ['Leads', 'Prospects', 'Clients'];

  const grouped: { [key: string]: ColumnData['items'] } = contacts.reduce(
    (acc: { [key: string]: ColumnData['items'] }, contact: Contact) => {
      if (!acc[contact.type]) {
        acc[contact.type] = [];
      }
      acc[contact.type].push({
        id: contact.id.toString(),
        title: `${contact.first_name} ${contact.last_name}`,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        updatedAt: contact.updatedAt,
        contactId: contact.id,
      });

      return acc;
    },
    {}
  );

  return desiredColumnIds.map((id) => ({
    id,
    items: grouped[id] || [],
  }));
}

const Board: React.FC<BoardProps> = ({
  contacts,
  onContactTypeChange,
  onColumnChange,
}) => {
  const desiredColumns = [
    { id: 'Leads', label: 'Leads' },
    { id: 'Prospects', label: 'Prospects' },
    { id: 'Clients', label: 'Clients' },
  ];

  const [columns, setColumns] = useState<ColumnData[]>([]);

  useEffect(() => {
    if (contacts) {
      const groupedContacts = groupContactsByType(contacts);
      setColumns(groupedContacts);
      console.log(contacts);
    }
  }, [contacts]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceColumnIndex = columns.findIndex(
      (column) => column.id === source.droppableId
    );
    const destColumnIndex = columns.findIndex(
      (column) => column.id === destination.droppableId
    );

    if (source.droppableId !== destination.droppableId) {
      const sourceItems = Array.from(columns[sourceColumnIndex].items);
      const destItems = Array.from(columns[destColumnIndex].items);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns(
        columns.map((column, index) => {
          if (index === sourceColumnIndex) {
            return { ...column, items: sourceItems };
          }
          if (index === destColumnIndex) {
            return { ...column, items: destItems };
          }
          return column;
        })
      );

      const contactId = parseInt(removed.id, 10);
      updateCard(contactId, destination.droppableId, destination.index);
      if (onContactTypeChange) {
        onContactTypeChange(contactId, destination.droppableId);
        onColumnChange(contactId, destination.droppableId);
      }
    } else {
      const columnItems = Array.from(columns[sourceColumnIndex].items);
      const [removed] = columnItems.splice(source.index, 1);
      columnItems.splice(destination.index, 0, removed);
      setColumns(
        columns.map((column, index) => {
          if (index === sourceColumnIndex) {
            return { ...column, items: columnItems };
          }
          return column;
        })
      );

      columnItems.forEach((item, index) => {
        const contactId = parseInt(item.id.substring(1), 10);
        if (index !== source.index && index !== destination.index) {
          updateCard(contactId, source.droppableId, index);
        }
      });

      const contactId = parseInt(removed.id, 10); // Retirez .substring(1)
      updateCard(contactId, source.droppableId, destination.index);
      if (onContactTypeChange) {
        onContactTypeChange(contactId, destination.droppableId);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '90%',
        }}
      >
        {desiredColumns.map((desiredColumn) => {
          const column = columns.find(
            (column) => column.id === desiredColumn.id
          );

          return (
            <StrictModeDroppable
              droppableId={desiredColumn.id}
              key={desiredColumn.id}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    width: '30%',
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#7b7f8530',
                  }}
                >
                  <h3 style={{ color: '#fff' }}>{desiredColumn.label}</h3>
                  <Column
                    key={desiredColumn.id}
                    id={desiredColumn.id}
                    title={desiredColumn.label}
                    cards={column ? column.items : []}
                    onContactTypeChange={onContactTypeChange}
                  />
                  <Divider orientation="vertical" flexItem />
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export { Board };
