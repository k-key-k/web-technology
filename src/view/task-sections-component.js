import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskTableComponentTemplate(boardName, boardClass) {
    return (
        `
            <article class="board__column task-column task-column--${boardClass}">
                <h3 class="task-column__title">${boardName}</h3>            
            </article>
        `
    );
}

export default class TaskTableComponent extends AbstractComponent {
    constructor(boardName, boardClass) {
        super();
        this.boardName = boardName;
        this.boardClass = boardClass;        
    }

    get template() {
        return createTaskTableComponentTemplate(this.boardName, this.boardClass);
    }

}
