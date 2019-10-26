import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import DocumentRequest from './pages/DocumentRequest'
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Route path="/:requestId" component={DocumentRequest}/>
      </div>
    </Router>
  );
}

export default App;
