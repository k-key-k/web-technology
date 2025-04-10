import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNoTaskComponent() {
    return (
        `
        <div class="task-column__item task-column__item--empty">
            <div class="task__body">
                <li class="task-placeholder">Перетащите карточку</li>
            </div>
        </div>
        `
    );
}

export default class NoTaskComponent extends AbstractComponent{
    
    get template() {
        return createNoTaskComponent();
    }

}