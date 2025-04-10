import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderComponentTemplate() {
    return (
        `
            <header-section>
                    <header class="header">Список задач</header>
            </header-section>
        `
    );
}

export default class HeaderComponent extends AbstractComponent {
    
    get template() {
        return createHeaderComponentTemplate();
    }

}