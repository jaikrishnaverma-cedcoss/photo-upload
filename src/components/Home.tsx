import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Form from './Form';

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{  padding: '20px' ,display:'flex',flexDirection:'column',alignItems:'center'}} >
       <Form/>
      </Container>
    </React.Fragment>
  );
}