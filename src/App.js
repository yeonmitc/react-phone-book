import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import {
  CssBaseline,
  Box,
  Typography ,
  TextField,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
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

  const FancyTypography = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(3),
    color: '#4a90e2', // 부드러운 블루 색상
    fontWeight: 'bold',
    fontFamily: "'Roboto', sans-serif",
    display: 'inline-block',
    padding: '8px 16px',
    background: 'linear-gradient(45deg, #e6f0fa, #f0f8ff)', // 은은한 그라디언트 배경
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // 부드러운 그림자
    animation: 'slideIn 1s ease-out',
  }));

  const MovingEmoji = styled('span')({
    display: 'inline-block',
    animation: 'bounce 1.5s ease-in-out infinite',
    '@keyframes bounce': {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-8px)', // 위아래로 움직이는 정도
      },
    },
  });

  return (
    <div className="App">
      <CssBaseline />
      <Box display="flex" justifyContent="center" marginBottom={2}>
      <FancyTypography variant="h4" component="h1">
      <MovingEmoji>📱</MovingEmoji> 내 연락처 저장  <MovingEmoji>☎️✨</MovingEmoji>
</FancyTypography>;
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