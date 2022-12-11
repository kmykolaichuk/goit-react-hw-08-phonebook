import React from 'react';
import { getFilter } from 'redux/contacts/contact-selectors';
import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from 'redux/contacts/contacts-actions';
import { Box, Container, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            margin="normal"
            size="small"
            id="filter"
            label="Find contacts by name"
            name="filter"
            value={filter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={e => dispatch(filterContacts(e.currentTarget.value))}
          />
        </Box>
      </Container>
    </>
  );
}
