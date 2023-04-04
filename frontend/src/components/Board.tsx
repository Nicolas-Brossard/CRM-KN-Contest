import React, { useState, useEffect, useRef } from 'react';
import { Column } from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import jwt_decode from 'jwt-decode';

interface ColumnData {
  id: string;
  items: {
    id: string;
    title: string;
    email: string;
    phone: string | null;
  }[];
}

interface Contact {
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
  onContactTypeChange?: (contactId: number, newType: string) => void;
}

async function updateCard(contactId: number, newType: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/contact/${contactId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: newType }),
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

async function fetchContacts(userId: string) {
  const response = await fetch(
    `http://localhost:3000/api/contact?userId=${userId}`
  );
  const contacts = await response.json();
  return contacts;
}

function groupContactsByType(contacts: Contact[]): ColumnData[] {
  const desiredColumnIds = ['Leads', 'Prospects', 'Clients'];

  const grouped: { [key: string]: ColumnData['items'] } = contacts.reduce(
    (acc: { [key: string]: ColumnData['items'] }, contact: Contact) => {
      if (!acc[contact.type]) {
        acc[contact.type] = [];
      }
      acc[contact.type].push({
        id: `C${contact.id}`,
        title: `${contact.first_name} ${contact.last_name}`,
        email: contact.email,
        phone: contact.phone,
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

const Board: React.FC<BoardProps> = ({ contacts, onContactTypeChange }) => {
  const desiredColumns = [
    { id: 'Leads', label: 'Leads' },
    { id: 'Prospects', label: 'Prospects' },
    { id: 'Clients', label: 'Clients' },
  ];

  const [columns, setColumns] = useState<ColumnData[]>([]);
  const prevColumnsRef = useRef<ColumnData[]>();

  useEffect(() => {
    if (contacts) {
      const groupedContacts = groupContactsByType(contacts);
      if (
        !prevColumnsRef.current ||
        JSON.stringify(prevColumnsRef.current) !==
          JSON.stringify(groupedContacts)
      ) {
        setColumns(groupedContacts);
      }
    }
  }, [contacts, columns]);

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

      const contactId = parseInt(removed.id.substring(1), 10);
      updateCard(contactId, destination.droppableId);
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
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
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
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  <h3>{desiredColumn.label}</h3>
                  <Column
                    key={desiredColumn.id}
                    id={desiredColumn.id}
                    title={desiredColumn.label}
                    cards={column ? column.items : []}
                    onContactTypeChange={onContactTypeChange}
                  />
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
