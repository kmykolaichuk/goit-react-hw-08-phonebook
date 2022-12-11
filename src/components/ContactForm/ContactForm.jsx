import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/contacts-operations';
import { getContacts } from 'redux/contacts/contact-selectors';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const saveContact = name => {
    const newContact = {
      name: name,
      number: number,
    };

    if (contacts.find(us => us.name === newContact.name)) {
      toast.error('Ваш контакт уже есть в списке!');
      return;
    }
    dispatch(addContact(newContact));
    toast.success('Ваш контакт добавлен!');
  };

  const handleSubmit = e => {
    e.preventDefault();
    saveContact(name);
    setName('');
    setNumber('');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
          <PersonAddAltRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Contact
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, mb: 7 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            autoFocus
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            name="number"
            label="Phone number"
            type="phone"
            id="number"
            value={number}
            onChange={e => setNumber(e.currentTarget.value)}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Contact
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
