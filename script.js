class ListItem {
    constructor(task, creationDate, expirationDate) {
        this.task = task;
        this.creationDate = creationDate;
        this.expirationDate = expirationDate;
    }
}

class UI {
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
            <input type="checkbox">
            <p>${task.task}</p>
            <i class="fas fa-trash-alt"></i>
        `;

        itemList.append(listItem);
        
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

class DateHandler {
    static getNextDay() {
        const date = new Date();
        const nextDay = new Date( date.setDate(date.getDate() + 1) )
        .toLocaleDateString();

        return nextDay;
    }

    static getCurrentTime() {
        const date = new Date();
        const currentTime = date.toLocaleTimeString();
        return currentTime;
    }
}


class Validator {
    static validate(str) {
        const regex = /^[A-Za-z0-9 ]+$/
        const isValid = regex.test(str);

        return isValid;
    }
}

//Event: diplay task-list
document.addEventListener('DOMContentLoaded', UI.displayListItems);

//Event: add task to list on main form submit
document.querySelector('form').addEventListener('submit', () => {
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

    if(Validator.validate(task) && Validator.validate(creationDate)
    && Validator.validate(expirationDate)){
        const taskObj = new ListItem(task, creationDate, expirationDate);

        UI.addTaskToList(taskObj);
        UI.toggleModal();
        UI.clearModalInputs();
    }

})

//Event: hide modal "cancel" button press
document.querySelector('#modal-cancel').addEventListener('click', () => {
    UI.toggleModal();
});

