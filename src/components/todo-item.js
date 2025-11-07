import { LitElement, html } from 'lit';

/**
 * TodoItem - Individual todo item component
 * @element todo-item
 * @fires toggle-todo - fired when checkbox is toggled
 * @fires delete-todo - fired when delete button is clicked
 * @fires update-todo - fired when todo text is updated
 */
export class TodoItem extends LitElement {
    static properties = {
        todo: { type: Object },
        isEditing: { state: true },
        editValue: { state: true }
    };

    //no shadow dom so external styles can reach
    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.isEditing = false;
        this.editValue = '';
    }

    /**
     * handles toggling todo completion
     * dispatches toggle-todo event with todo id
     */
    handleToggle() {
        this.dispatchEvent(new CustomEvent('toggle-todo', {
            detail: { id: this.todo.id },
            bubbles: true,
            composed: true
        }));
    }

    /**
     * handles deleting a todo
     * prompts for confirmation then dispatches delete-todo event
     */
    handleDelete() {
        if (confirm('Delete this todo?')) {
            this.dispatchEvent(new CustomEvent('delete-todo', {
                detail: { id: this.todo.id },
                bubbles: true,
                composed: true
            }));
        }
    }

    /**
     * enters edit mode for this todo
     */
    handleEdit() {
        this.isEditing = true;
        this.editValue = this.todo.text;
    }

    /**
     * saves the edited todo text
     * dispatches update-todo event if text is valid
     */
    handleSave() {
        if (this.editValue.trim()) {
            this.dispatchEvent(new CustomEvent('update-todo', {
                detail: { id: this.todo.id, text: this.editValue },
                bubbles: true,
                composed: true
            }));
            this.isEditing = false;
        }
    }

    /**
     * cancels editing and reverts to display mode
     */
    handleCancel() {
        this.isEditing = false;
        this.editValue = '';
    }

    /**
     * handles keyboard shortcuts in edit mode
     * @param {KeyboardEvent} e - keyboard event
     */
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.handleSave();
        } else if (e.key === 'Escape') {
            this.handleCancel();
        }
    }

    /**
     * renders the component
     * @returns {TemplateResult} lit html template
     */
    render() {
        //render edit mode if editing
        if (this.isEditing) {
            return html`
                <div class="todo-item">
                    <input
                            class="edit-input"
                            type="text"
                            .value=${this.editValue}
                            @input=${(e) => this.editValue = e.target.value}
                            @keydown=${this.handleKeyDown}
                            autofocus
                    />
                    <div class="button-group">
                        <button class="save-btn" @click=${this.handleSave}>Save</button>
                        <button class="cancel-btn" @click=${this.handleCancel}>Cancel</button>
                    </div>
                </div>
            `;
        }

        //render normal display mode
        return html`
            <div class="todo-item">
                <input
                        type="checkbox"
                        class="checkbox"
                        .checked=${this.todo.completed}
                        @change=${this.handleToggle}
                        aria-label="Toggle todo"
                />
                <span class="todo-text ${this.todo.completed ? 'completed' : ''}">
          ${this.todo.text}
        </span>
                <div class="button-group">
                    <button
                            class="edit-btn"
                            @click=${this.handleEdit}
                            ?disabled=${this.todo.completed}
                            aria-label="Edit todo">
                        Edit
                    </button>
                    <button
                            class="delete-btn"
                            @click=${this.handleDelete}
                            aria-label="Delete todo">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('todo-item', TodoItem);