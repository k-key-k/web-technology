import { createElement } from "../framework/render.js";

function createHeaderComponentTemplate() {
    return (
        `
            <header-section>
                    <header class="header">Список задач</header>
            </header-section>
        `
    );
}

export default class HeaderComponent {
    getTemplate() {
        return createHeaderComponentTemplate();
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