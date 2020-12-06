import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'

import Main from './Components/mainComponent';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Main />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
