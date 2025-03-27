import { createElement } from "../framework/render.js";

function createTaskTableComponentTemplate(boardName, boardClass) {
    if (boardClass == "trash") {
        return (
            `
                <aside class="task-column ${boardClass}">
                    <h3>${boardName}</h3>                    
                    <form>
                        <button type="submit" class="clear-btn">Х Очистить</button>
                    </form>
                </aside>
            `
        );
    } else {
        return (
            `
                <article class="task-column ${boardClass}">
                    <h3>${boardName}</h3>
                </article>
            `
        );
    }
}

export default class TaskTableComponent {
    constructor(boardName, boardClass) {
        this.boardName = boardName;
        this.boardClass = boardClass;
        this.element = null;
    }

    getTemplate() {
        return createTaskTableComponentTemplate(this.boardName, this.boardClass);
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
