import { LitElement, html } from 'lit';
import { TodoModel } from '../models/todo-model.js';
import { StorageService } from '../services/storage-service.js';
import './todo-form.js';
import './todo-list.js';

/**
 * TodoApp - Main application component
 * Coordinates between Model and View components
 * @element todo-app
 */
export class TodoApp extends LitElement {
    static properties = {
        todos: { state: true }
    };

    //no shadow dom so external styles can reach
    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.storageService = new StorageService();
        this.model = new TodoModel(this.storageService);
        this.todos = this.model.todos;

        //subscribe to model changes to keep view in sync
        this.model.subscribe(() => {
            this.todos = [...this.model.todos];
        });
    }

    /**
     * handles adding a new todo
     * @param {CustomEvent} e - custom event with todo text in detail
     */
    handleAddTodo(e) {
        this.model.addTodo(e.detail.text);
    }

    /**
     * handles toggling a todo's completion status
     * @param {CustomEvent} e - custom event with todo id in detail
     */
    handleToggleTodo(e) {
        this.model.toggleComplete(e.detail.id);
    }

    /**
     * handles deleting a todo
     * @param {CustomEvent} e - custom event with todo id in detail
     */
    handleDeleteTodo(e) {
        this.model.deleteTodo(e.detail.id);
    }

    /**
     * handles updating a todo's text
     * @param {CustomEvent} e - custom event with id and text in detail
     */
    handleUpdateTodo(e) {
        this.model.updateTodo(e.detail.id, e.detail.text);
    }

    /**
     * handles clearing all completed todos
     * prompts user for confirmation before clearing
     */
    handleClearCompleted() {
        if (confirm('Clear all completed todos?')) {
            this.model.clearCompleted();
        }
    }

    /**
     * handles clearing all todos
     * prompts user for confirmation before clearing
     */
    handleClearAll() {
        if (confirm('Clear ALL todos? This cannot be undone.')) {
            this.model.clearAll();
        }
    }

    /**
     * renders the component
     * @returns {TemplateResult} lit html template
     */
    render() {
        return html`
            <div class="app-container">
                <h1>My Tasks</h1>
                <p class="subtitle">Stay organized and productive</p>

                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-value">${this.todos.length}</div>
                        <div class="stat-label">Total</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${this.model.activeCount}</div>
                        <div class="stat-label">Active</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${this.model.completedCount}</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>

                <todo-form
                        @add-todo=${this.handleAddTodo}>
                </todo-form>

                <todo-list
                        .todos=${this.todos}
                        @toggle-todo=${this.handleToggleTodo}
                        @delete-todo=${this.handleDeleteTodo}
                        @update-todo=${this.handleUpdateTodo}>
                </todo-list>

                <div class="actions">
                    <button
                            class="clear-completed"
                            @click=${this.handleClearCompleted}
                            ?disabled=${this.model.completedCount === 0}>
                        Clear Completed
                    </button>
                    <button
                            class="clear-all"
                            @click=${this.handleClearAll}
                            ?disabled=${this.todos.length === 0}>
                        Clear All
                    </button>
                </div>

                <div class="footer">
                    Lab 9: The final battle!
                </div>
            </div>
        `;
    }
}

customElements.define('todo-app', TodoApp);