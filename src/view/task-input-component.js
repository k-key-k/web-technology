import { createElement } from "../framework/render.js";

function createFormAddTaskComponentTemplate() {
    return (
        `<div>
            <h2>Новая задача</h2>
            <form class="input-container">
                <label for="task-name" class="visually-hidden">Введите название задачи</label>
                <input type="text" id="task-name" placeholder="Название задачи..." aria-label="Введите название задачи">
                <button type="submit" aria-label="Добавить задачу">+ Добавить</button>
            </form>
        </div>`
    );
}

export default class FormAddTaskComponent {
    getTemplate() {
        return createFormAddTaskComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement (this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}