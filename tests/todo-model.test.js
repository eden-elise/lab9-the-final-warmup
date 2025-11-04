import { test } from 'node:test';
import assert from 'node:assert';
import { TodoModel } from '../src/models/todo-model.js';

/**
 * Mock storage service for testing
 */
class MockStorage {
  constructor() {
    this.data = {};
  }

  save(key, value) {
    this.data[key] = value;
  }

  load(key, defaultValue) {
    return this.data[key] !== undefined ? this.data[key] : defaultValue;
  }

  remove(key) {
    delete this.data[key];
  }

  clear() {
    this.data = {};
  }
}

test('TodoModel - addTodo should add a new todo', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);

  model.addTodo('Test todo');

  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Test todo');
  assert.strictEqual(model.todos[0].completed, false);
});

test('TodoModel - should not add empty todos', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);

  model.addTodo('');
  model.addTodo('   ');

  assert.strictEqual(model.todos.length, 0);
});

test('should add multiple todos', () => {
    const storage = new MockStorage();
    const model = new TodoModel(storage);

    model.addTodo('First todo');
    model.addTodo('Second todo');
    model.addTodo('Third todo');

    assert.strictEqual(model.todos.length, 3);
    assert.strictEqual(model.todos[0].text, 'First todo');
    assert.strictEqual(model.todos[2].text, 'Third todo');
});

test('should assign unique IDs to todos', () => {
    const storage = new MockStorage();
    const model = new TodoModel(storage);

    model.addTodo('First');
    model.addTodo('Second');

    assert.notStrictEqual(model.todos[0].id, model.todos[1].id);
});

test('should toggle todo completion', () => {
    const storage = new MockStorage();
    const model = new TodoModel(storage);

    model.addTodo('Test todo');
    const id = model.todos[0].id;

    model.toggleComplete(id);
    assert.strictEqual(model.todos[0].completed, true);

    model.toggleComplete(id);
    assert.strictEqual(model.todos[0].completed, false);
});

test('should not throw error for non-existent ID', () => {
    const storage = new MockStorage();
    const model = new TodoModel(storage);

    assert.doesNotThrow(() => {
        model.toggleComplete(99999);
    });
});

test('should delete a todo', () => {
    const storage = new MockStorage();
    const model = new TodoModel(storage);

    model.addTodo('To be deleted');
    const id = model.todos[0].id;

    model.deleteTodo(id);
    assert.strictEqual(model.todos.length, 0);
});

test('should delete correct todo from multiple', () => {
    const storage = new MockStorage();
    const model = new TodoModel(storage);

    model.addTodo('First');
    model.addTodo('Second');
    model.addTodo('Third');
    const secondId = model.todos[1].id;

    model.deleteTodo(secondId);
    assert.strictEqual(model.todos.length, 2);
    assert.strictEqual(model.todos[0].text, 'First');
    assert.strictEqual(model.todos[1].text, 'Third');
});


