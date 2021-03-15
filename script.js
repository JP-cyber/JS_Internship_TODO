import UI from './modules/UI.js';
import ListItem from './modules/ListItem.js';
import Validator from './modules/Validator.js';
import ItemDisplayer from './modules/ItemDisplayer.js';

//Event: diplay task-list
document.addEventListener('DOMContentLoaded', UI.displayListItems);

//Event: add task to list on main form submit
document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault();

    const taskText = document.querySelector('#main-input').value;

    if(Validator.validate(taskText)){
        const taskObj = new ListItem(taskText);

        UI.addTaskToList(taskObj);
        UI.clearInput();
    }
    
});

//Event: show modal on '+' button press
document.querySelector('#modal').addEventListener('click', () => {
    UI.toggleModal('.modal-add');
});

//Event: add item to list on "save" button press
document.querySelector('#add-btn').addEventListener('click', () => {
    const task = document.querySelector('#task').value,
          creationDate = document.querySelector('#creation').value,
          expirationDate = document.querySelector('#expiration').value;


    const isAllInputsValid = Validator.validate(task) && Validator.validate(creationDate)
    && Validator.validate(expirationDate);

    if(isAllInputsValid){
        const taskObj = new ListItem(task, creationDate, expirationDate);

        UI.addTaskToList(taskObj);
        UI.toggleModal('.modal-add');
        UI.clearModalInputs('.modal-add');
    }

})

//Event: hide modal on "cancel" button press
const modals = document.querySelectorAll('.modal-cancel');
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        e.preventDefault();
        const targetModalSelector = e.target.parentElement.parentElement.classList[0];
        UI.toggleModal( `.${targetModalSelector}` );
    });
});

//Event: added possibility to edit element data
document.querySelector('#edit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const parentListItem = UI.currentElement;
    
    //Modal input values
    let 
        taskInput = document.querySelector('#task-edit').value,
        creationDateInput = document.querySelector('#creation-edit').value,
        expirationDateInput = document.querySelector('#expiration-edit').value;

    const isAllInputsValid = Validator.validate(taskInput)
    && Validator.validate(creationDateInput)
    && Validator.validate(expirationDateInput);

    if(isAllInputsValid){
        //Current item data
        let
            task = parentListItem.querySelector('p'),
            creation = parentListItem.querySelector('.recent-date'),
            expiration = parentListItem.querySelector('.expiration-date');

        task.textContent = taskInput;
        creation.textContent = creationDateInput;
        expiration.textContent = expirationDateInput;

        UI.toggleModal('.modal-edit');
        UI.clearModalInputs('.modal-edit');
    }
    
});

//Display Items Buttons

//Display all items
document.querySelector('#display-all').addEventListener('click', () => {
    ItemDisplayer.displayAllItems();
});

//Display active items
document.querySelector('#display-active').addEventListener('click', () => {
    ItemDisplayer.displayActiveItems();
});

//Display completed items
document.querySelector('#display-completed').addEventListener('click', () => {
    ItemDisplayer.displayCompletedItems();
});

//Delete all completed items
document.querySelector('#clear-completed').addEventListener('click', () => {
    ItemDisplayer.deleteCompletedItems();
});