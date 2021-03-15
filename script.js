import UI from './modules/UI.js';
import ListItem from './modules/ListItem.js';
import Validator from './modules/Validator.js';
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
    UI.toggleModal();
});

//Event: add item to list on "save" button press
document.querySelector('#modal-save').addEventListener('click', () => {
    const task = document.querySelector('#task').value,
          creationDate = document.querySelector('#creation').value,
          expirationDate = document.querySelector('#expiration').value;


    const isAllInputsValid = Validator.validate(task) && Validator.validate(creationDate)
    && Validator.validate(expirationDate);

    if(isAllInputsValid){
        const taskObj = new ListItem(task, creationDate, expirationDate);

        UI.addTaskToList(taskObj);
        UI.toggleModal();
        UI.clearModalInputs();
    }

})

//Event: hide modal on "cancel" button press
document.querySelector('#modal-cancel').addEventListener('click', () => {
    UI.toggleModal();
});

