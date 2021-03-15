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
}