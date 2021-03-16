import DateHandler from './DateHandler.js';

export default class ItemDisplayer {
    static items = document.getElementsByClassName('todo_item');

    static displayAllItems() {
        for(let item of ItemDisplayer.items){

            if( item.classList.contains('hide') ){
                item.classList.remove('hide');
            }

        }
    }

    static displayActiveItems() {
        for(let item of ItemDisplayer.items){
            const childCheckbox = item.querySelector('input');
            const isDoneItemHidden = childCheckbox.checked
            && item.classList.contains('hide');
            
            if(isDoneItemHidden){
                continue;
            }else if(childCheckbox.checked){
                item.classList.add('hide');
            }else{
                item.classList.remove('hide');
            }
        }
    }

    static displayCompletedItems() {
        for(let item of ItemDisplayer.items){
            const childCheckbox = item.querySelector('input');
            const isActiveItemHidden = !childCheckbox.checked
            && item.classList.contains('hide');
            
            if(isActiveItemHidden){
                continue;
            }else if(!childCheckbox.checked){
                item.classList.add('hide');
            }else{
                item.classList.remove('hide');
            }
        }
    }

    static deleteCompletedItems() {
        for(let item of ItemDisplayer.items){
            const isCompleted = item.querySelector('input').checked;

            if(isCompleted){
                item.remove();
            }
        }
    }

    static sortElemntsByText() {
        const elements = document.querySelectorAll('.todo_item');
        const elementsArray = [...elements];
        
        elementsArray.sort((a, b) => {
            const aText = a.querySelector('p').textContent;
            const bText = b.querySelector('p').textContent;

            if(aText < bText){
                return -1;
            }else if(aText > bText){
                return 1;
            }
            return 0;
        });

        const targetList = document.querySelector('.todo_item_list');
        targetList.textContent = '';
        elementsArray.forEach((item) => {
            targetList.append(item);
        });
    }

    static sortElementsByDate() {
        const elements = document.querySelectorAll('.todo_item');
        const elementsArray = [...elements];

        elementsArray.sort((a,b) => {
            const aDate = a.querySelector('.expiration-date').textContent;
            const bDate = b.querySelector('.expiration-date').textContent;
            
            const aTime = DateHandler.getTimeFromStr(aDate);
            const bTime = DateHandler.getTimeFromStr(bDate);

            if(aTime > bTime){
                return 1;
            }else if(aTime < bTime){
                return -1;
            }
            return 0;
        });

        const targetList = document.querySelector('.todo_item_list');
        targetList.textContent = '';
        elementsArray.forEach((item) => {
            targetList.append(item);
        });
    }
}