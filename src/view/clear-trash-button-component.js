import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearTrashButtonTemplate() {
    return (
        '<button class="clear-btn">Х Очистить</button>'
    );
}

export default class ClearTrashButtonComponent extends AbstractComponent{
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }
    
    get template() {
        return createClearTrashButtonTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
        this.element.disabled = true;
    }
}