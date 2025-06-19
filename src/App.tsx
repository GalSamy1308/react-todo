import React from 'react';
import './assests/css/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "./components/header/Header";
import TodosGrid from "./components/todo/TodosGrid";
import AddTodoModal from './components/modals/AddTodoModal';

function App() {
  return (
      <div className="App">
          <Header/>
          <TodosGrid/>
          <AddTodoModal/>
    </div>
  );
}

export default App;
