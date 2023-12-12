import React from 'react';
import SideBar from './components/SideBar';
import DataContext from './context/DataContext';
import './app.css'



function App() {
  
  return (
    <DataContext>
      <div id="wrapper">
          <SideBar />
      </div>
    </DataContext>
  );
}

export default App;
