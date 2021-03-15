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
        UI.clearModalInputs();
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

