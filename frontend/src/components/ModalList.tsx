import React from 'react';
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
}
interface ModalListProps {
  data: Contact[];
  type: string;
}

const ModalList: React.FC<ModalListProps> = ({ data }) => {
  const handleDelete = (id: number) => {
    // Gérer la suppression ici (par exemple, effectuer un appel fetch pour supprimer l'élément de la base de données)
  };

  const handleUpdate = (id: number) => {
    // Gérer la mise à jour ici (par exemple, ouvrir un formulaire de mise à jour et effectuer un appel fetch pour mettre à jour l'élément dans la base de données)
  };

  const handleAdd = (id: number) => {
    // Gérer l ajout (par exemple, ouvrir un formulaire d'ajout et effectuer un appel fetch pour ajouter l'élément dans la base de données)
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
        {data.length === 0 ? (
          <Typography variant="h6" align="center">
            Aucune donnée disponible
          </Typography>
        ) : (
          <List>
            {data.map((contact) => (
              <ListItem key={contact.id}>
                <ListItemText
                  primary={`${contact.first_name} ${contact.last_name}`}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdate(contact.id)}
                    style={{ margin: '5px' }}
                  >
                    Modifier
                  </Button>
                  <Button
                    style={{ margin: '5px' }}
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Supprimer
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export { ModalList };
