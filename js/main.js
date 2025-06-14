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

// Execute helper functions on page refresh
const refreshThePage = () => {
  clearListDisplay();
  // renderList();
  // clearItemEntryField();
  // setFocusOnItemEntryField();
};

// Clear items from container of list items
const clearListDisplay = () => {
  const parentElement = document.getElementById('listItems');
  deleteContents(parentElement);
};

// Clear until empty
const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;

  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};
