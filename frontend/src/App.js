import React from 'react';
import { Container } from 'reactstrap'
import Routes from './routes';
import './App.css';

function App() {
  return (
    <Container>
      <h1>Events Booker's App</h1>
      <div className="content">
        <Routes/>
      </div>
    </Container>
  );
}

export default App;
