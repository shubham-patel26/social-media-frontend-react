import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter} from 'react-router-dom'

import Main from './Components/mainComponent';

function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <Main />
      </React.Fragment>
    </HashRouter>
  );
}

export default App;
