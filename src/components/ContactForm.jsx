// components/ContactForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import usePhoneBookStore from '../stores/usePhoneBookStore';
const ContactForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberHelperText, setPhoneNumberHelperText] = useState('');
  const [submitError, setSubmitError] = useState('');
  const { addContact } = usePhoneBookStore();

  const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    console.log('cleaned:', cleaned);
    console.log('match:', match);
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return cleaned;
};
  const handleAddContact = () => {
    setSubmitError('');
    setNameError(false);
    setPhoneNumberError(false);

    if (!name.trim() || !phoneNumber.trim()) {
      setSubmitError('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    const phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError(true);
      setPhoneNumberHelperText('전화번호 형식을 확인해주세요 (예: 010xxxxxxxx).');
      return;
    }



    addContact(name, formatPhoneNumber(phoneNumber));
    setName('');
    setPhoneNumber('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddContact();
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberError(false);
    setPhoneNumberHelperText('');
  };

  return (
    <Grid container direction="column" spacing={2} alignItems="stretch">
      <Grid size={12}>
        <Typography variant="h6" component="h2" align="center">
          새 연락처 추가
        </Typography>
      </Grid>
      {submitError && (
        <Grid size={12}>
          <Typography color="error" align="center">
            {submitError}
          </Typography>
        </Grid>
      )}
      <Grid size={12}>
        <TextField
          fullWidth
          label="이름"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          helperText={nameError && '이름을 입력해주세요.'}
          onKeyDown={handleKeyDown}
          required
        />
      </Grid>
      <Grid size={12}>
        {phoneNumberError && (
          <Typography color="error" marginBottom={1}>
            {phoneNumberHelperText}
          </Typography>
        )}
        <TextField
          fullWidth
          label="전화번호"
          variant="outlined"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          error={phoneNumberError}
          slotProps={{
            htmlInput: {
              type: 'tel',
            },
          }}
          onKeyDown={handleKeyDown}
          required
        />
      </Grid>
      <Grid size={12}>
        <Button fullWidth variant="contained" onClick={handleAddContact}>
          추가
        </Button>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
