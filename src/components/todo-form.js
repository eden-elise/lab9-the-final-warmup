import { LitElement, html } from 'lit';

/**
 * TodoForm - Input form for adding new todos
 * @element todo-form
 * @fires add-todo - fired when user submits a new todo
 */
export class TodoForm extends LitElement {
    static properties = {
        inputValue: { state: true }
    };

    //no shadow dom so external styles can reach
    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.inputValue = '';
    }

    /**
     * handles form submission
     * @param {Event} e - form submit event
     */
    handleSubmit(e) {
        e.preventDefault();
        const text = this.inputValue.trim();

        if (text) {
            //dispatch custom event with todo text
            this.dispatchEvent(new CustomEvent('add-todo', {
                detail: { text },
                bubbles: true,
                composed: true
            }));

            this.inputValue = '';
        }
    }

    /**
     * handles input changes
     * @param {Event} e - input event
     */
    handleInput(e) {
        this.inputValue = e.target.value;
    }

    /**
     * renders the component
     * @returns {TemplateResult} lit html template
     */
    render() {
        return html`
            <form @submit=${this.handleSubmit}>
                <input
                        type="text"
                        placeholder="What needs to be done?"
                        .value=${this.inputValue}
                        @input=${this.handleInput}
                        aria-label="New todo"
                        autofocus
                />
                <button type="submit" ?disabled=${!this.inputValue.trim()}>
                    Add
                </button>
            </form>
        `;
    }
}

customElements.define('todo-form', TodoForm);