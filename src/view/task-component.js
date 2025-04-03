import { createElement } from "../framework/render.js";

function createTaskComponentTemplate(task) {
    
    const {title, status} = task;
    return (
        `
        <div class="taskboard__item task task--${status}">
            <div class="task__body">
                <li class="task">${title}</li>  
                <input type="text" class="task_edit-input" />              
            </div>    
            <button aria-label="Изменить" class="text__edit" type="button"></button>        
        </div>
        `
    );
}

export default class TaskComponent {
    constructor({task}) {
        this.task = task;
    }

    getTemplate() {
        return createTaskComponentTemplate(this.task);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}