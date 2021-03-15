import DateHandler from './DateHandler.js';

export default class UI {
    static displayListItems() {
        const listItems = [
            {
                task: 'First task',
                creationDate: 'today',
                expirationDate: ''
            },
            {
                task: 'Second task',
                creationDate: '',
                expirationDate: 'tomorrow'
            }
        ];

        listItems.forEach(task => {
            UI.addTaskToList(task);
        });
    }

    static addTaskToList(task) {
        const itemList = document.querySelector('.todo_item_list');
        const listItem = document.createElement('li');

        const recentDate = task.creationDate || DateHandler.getCurrentTime();
        const deadline = task.expirationDate || DateHandler.getNextDay();

        listItem.classList.add('todo_item');
        listItem.innerHTML = `
            <div class="date">
            Creation Date: <span class="recent-date">${recentDate}</span> |
            Expiration Date: <span class="expiration-date">${deadline}</span> 
            </div>
            <input class="checkbox" type="checkbox">
            <p>${task.task}</p>
            <i class="fas fa-pen edit" ></i>
            <i class="fas fa-trash-alt delete"></i>
        `;

        itemList.append(listItem);

        UI.checkboxHandler();
        UI.deleteButtonHandler();
        UI.editButtonHandler();

    }

    static currentElement = null;

    static editButtonHandler() {
        const editBtns = document.querySelectorAll('.edit');
        const lastEditBtn = editBtns[editBtns.length - 1];

        lastEditBtn.addEventListener('click', (e) => {
            e.preventDefault();
            UI.toggleModal('.modal-edit');
            UI.currentElement = e.target.parentElement;
        });
    }

    static deleteButtonHandler() {
        const deleteBtns = document.querySelectorAll('.delete');
        const lastDeleteBtn = deleteBtns[deleteBtns.length - 1];

        lastDeleteBtn.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }

    static checkboxHandler() {
        const checkboxes = document.querySelectorAll('.checkbox');
        const lastCheckbox = checkboxes[checkboxes.length - 1];

        lastCheckbox.addEventListener('click', (e) => {
            e.target.nextElementSibling.classList.toggle('done');
        });
    }

    static clearInput() {
        const input = document.querySelector('#main-input');
        input.value = '';
    }

    static clearModalInputs(selector) {
        const modalInputs = document.querySelector(selector)
        .querySelectorAll('input');

        modalInputs.forEach((input) => {
            input.value = '';
        });

    }

    static toggleModal(selector) {
        const modal = document.querySelector(selector);
        modal.classList.toggle('hide');
    }
}