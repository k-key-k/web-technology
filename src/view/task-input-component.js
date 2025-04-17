import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate() {
    return (
        `<div class="widget__inner">
            <h2 class="widget__title">Новая задача</h2>
            <form class="form">
                <label for="task-name" class="visually-hidden">Введите название задачи</label>
                <input type="text" id="add-task-name" class="form__input" placeholder="Название задачи..." aria-label="Введите название задачи">
                <button type="submit" class="form__btn" aria-label="Добавить задачу">+ Добавить</button>
            </form>
        </div>`
    );
}

export default class FormAddTaskComponent extends AbstractComponent {    
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }

    get template() {
        return createFormAddTaskComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
}