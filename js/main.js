import ToDoList from './todolist';
import ToDoItem from './todoitem';
import ToDoList from './todolist';

const ToDoList = new ToDoList();

// Launch app
document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  // Add listeners

  // Procedural
  // Load list object

  refreshThePage();
};

const refreshThePage = () => {
  clearListDisplay();
  // renderList();
  // clearItemEntryField();
  // setFocusOnItemEntryField();
};
