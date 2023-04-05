import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import jwt_decode from 'jwt-decode';

interface Action {
  id: number;
  type: string;
  description: string;
  date: string;
}
interface ActionModalProps {
  contactId: number;
  open: boolean;
  onClose: () => void;
  contactName: string;
}

const ActionModal: React.FC<ActionModalProps> = ({
  open,
  onClose,
  contactName,
  contactId,
}) => {
  const [newAction, setNewAction] = useState({
    type: '',
    description: '',
    date: '',
  });

  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    let isMounted = true;
    if (open) {
      const fetchActions = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/action?contactId=${contactId}`
          );
          const data = await response.json();
          if (isMounted) {
            setActions(data);
          }
        } catch (error) {
          console.error('Failed to fetch actions:', error);
        }
      };

      fetchActions();
    }

    return () => {
      isMounted = false;
    };
  }, [open, contactId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { type, description, date } = newAction;

    try {
      const token = localStorage.getItem('token');
      const decoded: any = jwt_decode(token as string);
      const userId = decoded.id;

      const response = await fetch('http://localhost:3000/api/action/create ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          description,
          date,
          contact_id: contactId,
          user_id: userId,
        }),
      });

      if (response.ok) {
        const newAction = await response.json();
        setActions([...actions, newAction]);
      } else {
        console.error('Error saving action');
      }
    } catch (error) {
      console.error('Error while saving action:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#2f3c4c', borderRadius: 5 }}>
      <Dialog
        onClose={onClose}
        open={open}
        PaperProps={{
          style: {
            overflowX: 'hidden',
          },
        }}
      >
        <div>
          <DialogTitle
            sx={{
              backgroundColor: '#303c4c',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Actions pour {contactName}
          </DialogTitle>
        </div>

        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {actions.map((action) => (
            <>
              <ListItem
                key={action.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#d3d2d234',
                  width: '90%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <ListItemText
                  primary={action.type}
                  secondary={action.description}
                />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>

        <form onSubmit={handleSave}>
          <Grid container spacing={2} style={{ padding: '1%', margin: '15px' }}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <TextField
                  label="Type"
                  value={newAction.type}
                  onChange={(e) =>
                    setNewAction({ ...newAction, type: e.target.value })
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <TextField
                  label="Description"
                  value={newAction.description}
                  onChange={(e) =>
                    setNewAction({ ...newAction, description: e.target.value })
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <TextField
                  label="Date"
                  type="date"
                  value={newAction.date}
                  onChange={(e) =>
                    setNewAction({ ...newAction, date: e.target.value })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              alignContent="center"
              justifyContent="center"
            >
              <Button
                type="submit"
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  backgroundColor: '#EDC88C',
                  color: 'white',
                }}
              >
                Enregistrer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
};

export { ActionModal };
