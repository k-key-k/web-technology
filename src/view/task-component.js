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
        this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

    #afterCreateElement() {
        this.#makeTaskDraggable();
    }

    #makeTaskDraggable() {
        this.element.setAttribute('draggable', true);

        this.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.task.id);
        });
    }
}