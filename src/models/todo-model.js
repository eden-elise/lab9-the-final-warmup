/**
 * TodoModel - Manages the todo list data and business logic
 * Implements the Observer pattern for reactive updates
 */
export class TodoModel {
    /**
     * creates a new todo model
     * @param {StorageService} storageService - service for persisting data
     */
    constructor(storageService) {
        this.storage = storageService;
        this.todos = this.storage.load('items', []);
        this.listeners = [];
        this.nextId = this.storage.load('nextId', 1);
    }

    /**
     * subscribes a listener to model changes
     * @param {Function} listener - callback function to invoke on changes
     */
    subscribe(listener) {
        this.listeners.push(listener);
    }

    /**
     * notifies all subscribers of changes
     */
    notify() {
        this.listeners.forEach(listener => listener());
    }

    /**
     * adds a new todo to the list
     * @param {string} text - the todo text
     */
    addTodo(text) {
        if (!text || text.trim() === '') {
            return;
        }

        const todo = {
            id: this.nextId++,
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(todo);
        this.save();
        this.notify();
    }

    /**
     * toggles the completion status of a todo
     * @param {number} id - the todo id
     */
    toggleComplete(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.save();
            this.notify();
        }
    }

    /**
     * deletes a todo from the list
     * @param {number} id - the todo id
     */
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
        this.notify();
    }

    /**
     * updates the text of an existing todo
     * @param {number} id - the todo id
     * @param {string} newText - the new text
     */
    updateTodo(id, newText) {
        const todo = this.todos.find(t => t.id === id);
        if (todo && newText && newText.trim() !== '') {
            todo.text = newText.trim();
            this.save();
            this.notify();
        }
    }

    /**
     * removes all completed todos from the list
     */
    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.save();
        this.notify();
    }

    /**
     * removes all todos from the list
     */
    clearAll() {
        this.todos = [];
        this.save();
        this.notify();
    }

    /**
     * gets the count of active (not completed) todos
     * @returns {number} count of active todos
     */
    get activeCount() {
        return this.todos.filter(t => !t.completed).length;
    }

    /**
     * gets the count of completed todos
     * @returns {number} count of completed todos
     */
    get completedCount() {
        return this.todos.filter(t => t.completed).length;
    }

    /**
     * persists todos and nextId to storage
     */
    save() {
        this.storage.save('items', this.todos);
        this.storage.save('nextId', this.nextId);
    }
}