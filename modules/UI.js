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
            Creation Date: ${recentDate} |
            Expiration Date: ${deadline} 
            </div>
            <input class="checkbox" type="checkbox">
            <p>${task.task}</p>
            <i class="fas fa-trash-alt"></i>
        `;

        itemList.append(listItem);

        UI.checkboxHandler();

    }

    static checkboxHandler(){
        const checkboxes = document.querySelectorAll('.checkbox');
        const lastElementIndex = checkboxes.length - 1;
        const lastCheckbox = checkboxes[lastElementIndex];

        lastCheckbox.addEventListener('click', (e) => {
            e.target.nextElementSibling.classList.toggle('done');
        });
    }

    static clearInput() {
        const input = document.querySelector('#main-input');
        input.value = '';
    }

    static clearModalInputs() {
        const modalInputs = document.querySelector('.modal-content')
        .querySelectorAll('input');

        modalInputs.forEach((input) => {
            input.value = '';
        });

    }

    static toggleModal() {
        const modal = document.querySelector('.modal');
        modal.classList.toggle('hide');
    }
}