import ToDoList from './todolist.js';
import ToDoItem from './todoitem.js';

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

  const clearItems = document.getElementById('clearItems');
  clearItems.addEventListener('click', (e) => {
    const list = toDoList.getList();

    if (list.length) {
      const confirmed = confirm(
        'Are you sure you want to clear the entire list?'
      );

      if (confirmed) {
        toDoList.clearList();
        updatePersistentData(toDoList.getList());

        refreshThePage();
      }
    }
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
    updatePersistentData(toDoList.getList());

    setTimeout(() => {
      refreshThePage();
    }, 1000);
  });
};

const updatePersistentData = (listArray) => {
  localStorage.setItem('myToDoList', JSON.stringify(listArray));
};

const clearItemEntryField = () => {
  document.getElementById('newItem').value = '';
};

const setFocusOnItemEntryField = () => {
  document.getElementById('newItem').focus();
};

const processSubmission = () => {
  const newEntryText = getNewEntry();

  // If field is cleared, end
  if (!newEntryText.length) return;

  const nextItemId = calcNextItemId();
  const toDoItem = createNewItem(nextItemId, newEntryText);

  toDoList.addItemToList(toDoItem);
  updatePersistentData(toDoList.getList());

  refreshThePage();
};

const getNewEntry = () => {
  return document.getElementById('newItem').value.trim();
};

const calcNextItemId = () => {
  let nextItemId = 1;
  const list = toDoList.getList();

  if (list.length > 0) {
    nextItemId = list[list.length - 1].getId() + 1;
  }

  return nextItemId;
};

const createNewItem = (itemId, itemText) => {
  const toDo = new ToDoItem();
  toDo.setId(itemId);
  toDo.setItem(itemText);

  return toDo;
};
