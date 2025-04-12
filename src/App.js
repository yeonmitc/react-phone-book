import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import {
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import usePhoneBookStore from './stores/usePhoneBookStore';

function App() {
  const {
    searchInput,
    setSearchInput,
    applySearch,
    filteredContacts,
    initializeFilteredContacts,
  } = usePhoneBookStore();

  const [isComposing, setIsComposing] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    initializeFilteredContacts();
  }, [initializeFilteredContacts]);

  const handleInputChange = useCallback((event) => {
    setSearchInput(event.target.value);
    if (event.target.value === '') {
      initializeFilteredContacts();
    }
  }, [setSearchInput, initializeFilteredContacts]);

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, [setIsComposing]);

  const handleCompositionEnd = useCallback((event) => {
    setIsComposing(false);
    setSearchInput(event.target.value);
  }, [setSearchInput, setIsComposing]);

  const handleApplySearch = useCallback(() => {
    applySearch();
    setSearchInput('');
  }, [applySearch, setSearchInput]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      handleApplySearch();
    }
  }, [handleApplySearch]);

  return (
    <div className="App">
      <CssBaseline />
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Typography variant="h4" component="h1" margin={3}>
          My Phone-BOOK
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        marginBottom={2}
      >
        <TextField
          label="이름으로 검색"
          variant="outlined"
          size="Large"
          value={searchInput}
          onChange={handleInputChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleKeyPress} // Enter 키 이벤트 핸들러 추가 (onKeyPress is deprecated)
          className="search-input"
        />
        <Button
          variant="contained"
          className="search-button"
          onClick={handleApplySearch}
        >
          검색
        </Button>
      </Box>
      <Grid container spacing={isMobile ? 1 : 2} padding={3} direction={isMobile ? 'column' : 'row'}>
        <Grid size={isMobile ? 12 : 6} padding={3}>
          <ContactForm />
        </Grid>
        <Grid size={isMobile ? 12 : 6}>
          <ContactList contacts={filteredContacts} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;