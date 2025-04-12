// components/ContactList.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import usePhoneBookStore from '../stores/usePhoneBookStore';

function ContactList({ contacts }) {
  const { deleteContact, searchInput } = usePhoneBookStore();

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <Typography variant="h6" textAlign='center'>연락처 목록</Typography>
      <List>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ListItem key={contact.id} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => deleteContact(contact.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={contact.name} secondary={contact.phoneNumber} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Box display="flex" justifyContent="center" width="100%">
              <ListItemText
                primary={searchInput ? "찾는 연락처가 없습니다." : "등록된 연락처가 없습니다."}
                sx={{ textAlign: 'center' }}
              />
            </Box>
          </ListItem>
        )}
      </List>
    </div>
  );
}

export default ContactList;