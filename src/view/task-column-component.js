import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTasksListComponentTemplate() {
    return (
        `
            <ul class="task-column__list"></ul>
        `
    );
}

export default class TasksListComponent extends AbstractComponent {

    get template() {
        return createTasksListComponentTemplate();
    }

}
