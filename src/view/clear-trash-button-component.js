import { createElement } from "../framework/render.js";

function createClearTrashButtonTemplate() {
    return (
        '<button class="clear-btn">Х Очистить</button>'
    );
}

export default class ClearTrashButtonComponent {
    constructor() {
        this.element = null;
    }

    getTemplate() {
        return createClearTrashButtonTemplate();
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