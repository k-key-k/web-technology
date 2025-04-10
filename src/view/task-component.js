import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
    
    const {title, status} = task;
    return (
        `
        <div class="task-column__item">
            <div class="task__body">
                <li class="task">${title}</li>  
                <input type="text" class="task__edit-input" />              
            </div>    
            <button aria-label="Изменить" class="text__edit" type="button"></button>        
        </div>
        `
    );
}

export default class TaskComponent extends AbstractComponent {
    constructor({task}) {
        super();
        this.task = task;
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

}