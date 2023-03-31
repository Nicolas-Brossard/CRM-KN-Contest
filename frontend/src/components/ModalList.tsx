import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';

interface DataItem {
  id: number;
  name: string;
}

const ModalList: React.FC = (props) => {
  const [data, setData] = useState<DataItem[]>([
    { id: 1, name: 'Lead 1' },
    { id: 2, name: 'Lead 2' },
    { id: 3, name: 'Lead 3' },
  ]);

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <Card
      style={{
        width: '80%',
        margin: 'auto',
        height: '50%',
      }}
    >
      <CardContent>
        <List>
          {data.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(item.id)}
                >
                  Supprimer
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Voir plus
        </Button>
      </CardActions>
    </Card>
  );
};

export { ModalList };
