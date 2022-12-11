import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  removeContact,
} from 'redux/contacts/contacts-operations';
import { getFilterContacts } from 'redux/contacts/contact-selectors';
import { Name, Number, Container, List } from './ContactList.styled';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Grid,
  IconButton,
  ListItem,
  Avatar,
  ListItemAvatar,
} from '@mui/material';

export const ContactList = () => {
  const contacts = useSelector(getFilterContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    let nameFirstLetters = '';
    if (name.includes(' ')) {
      nameFirstLetters = `${name.toUpperCase().split(' ')[0][0]}${
        name.toUpperCase().split(' ')[1][0]
      }`;
    } else {
      nameFirstLetters = `${name.toUpperCase().split(' ')[0][0]}`;
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: nameFirstLetters,
    };
  }

  return (
    <Container>
      <List>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {contacts.map(({ id, name, number }) => (
            <ListItem key={id}>
              <ListItemAvatar>
                <Avatar {...stringAvatar(`${name}`)} />
              </ListItemAvatar>

              <Name>{name}:</Name>
              <Number>{number}</Number>

              <IconButton
                edge="end"
                aria-label="delete"
                id={id}
                onClick={() => dispatch(removeContact(id))}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </Grid>
      </List>
    </Container>
  );
};
