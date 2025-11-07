import { LitElement, html } from 'lit';
import './todo-item.js';

/**
 * TodoList - Displays a list of todos
 * @element todo-list
 * @property {Array} todos - array of todo objects to display
 */
export class TodoList extends LitElement {
    static properties = {
        todos: { type: Array }
    };

    //no shadow dom so external styles can reach
    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.todos = [];
    }

    /**
     * renders the component
     * @returns {TemplateResult} lit html template
     */
    render() {
        //show empty state when no todos
        if (this.todos.length === 0) {
            return html`
                <div class="empty-state">
                    <div class="empty-icon">📋</div>
                    <p>No todos yet. Add one above!</p>
                </div>
            `;
        }

        //render list of todo items
        return html`
            <div class="list-container">
                ${this.todos.map(todo => html`
                    <todo-item .todo=${todo}></todo-item>
                `)}
            </div>
        `;
    }
}

customElements.define('todo-list', TodoList);