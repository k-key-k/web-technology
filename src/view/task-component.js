import { createElement } from "../framework/render.js";

function createTaskComponentTemplate(taskName, taskClass) {
    return (
        `
            <li class="task" data-status="${taskClass}">${taskName}</li>
        `
    );
}

export default class TaskComponent {
    constructor(taskName, taskClass) {
        this.taskName = taskName;
        this.taskClass = taskClass;
        this.element = null;
    }

    getTemplate() {
        return createTaskComponentTemplate(this.taskName, this.taskClass);
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