import { createElement } from "../framework/render.js";

function createTasksListComponentTemplate() {
    return (
        `
            <ul class="task-list" role="list"></ul>
        `
    );
}

export default class TasksListComponent {
    constructor() {
        this.element = null;
    }

    getTemplate() {
        return createTasksListComponentTemplate();
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
