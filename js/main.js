import ToDoList from './todolist';
import ToDoItem from './todoitem';

const toDoList = new ToDoList();

// Launch app
document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  // Add listeners
  const itemEntryForm = document.getElementById('itemEntryForm');
  itemEntryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    processSubmission();
  });

  // Procedural
  // Load list object

  refreshThePage();
};

// Execute helper functions on page refresh
const refreshThePage = () => {
  clearListDisplay();
  renderList();
  clearItemEntryField();
  setFocusOnItemEntryField();
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

// Render list of entered items
const renderList = () => {
  const list = toDoList.getList();

  list.forEach((item) => {
    buildListItem(item);
  });
};

// Build DOM elements based off of list array
const buildListItem = (item) => {
  const div = document.createElement('div');
  div.className = 'item';

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.id = item.getId();
  check.tabIndex = 0;

  addClickListenerToCheckbox(check);

  const label = document.createElement('label');
  label.htmlFor = item.getId();
  label.textContent = item.getItem();

  div.appendChild(check);
  div.appendChild(label);

  const container = document.getElementById('listItems');
  container.appendChild(div);
};

const addClickListenerToCheckbox = (checkbox) => {
  checkbox.addEventListener('click', (e) => {
    toDoList.removeItemFromList(checkbox.id);
    // TODO: remove from persistent data
    setTimeout(() => {
      refreshThePage();
    }, 1000);
  });
};

const clearItemEntryField = () => {
  document.getElementById('newItem').value = '';
};

const setFocusOnItemEntryField = () => {
  document.getElementById('newItem').focus();
};

const processSubmission = () => {
  // next
};
