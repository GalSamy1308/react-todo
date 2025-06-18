import React from 'react';
import './assests/css/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "./components/header/Header";
import ToDosGrid from "./components/todo/ToDosGrid";
import AddTodoModal from './components/modals/AddTodoModal';

function App() {
  return (
      <div className="App">
          <Header></Header>
          <ToDosGrid></ToDosGrid>
          <AddTodoModal></AddTodoModal>
    </div>
  );
}

export default App;
