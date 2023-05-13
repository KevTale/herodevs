import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export type Todo = {
  id: string;
  show: boolean;
  text: string;
  completed: boolean;
};

interface TodosState {
  todos: Todo[];
}

@Injectable({
  providedIn: 'root',
})
export class TodosStore extends ComponentStore<TodosState> {
  readonly todos = this.selectSignal(({ todos }) => todos);
  readonly hasTodos = this.selectSignal(({ todos }) => todos.length > 0);

  constructor() {
    super({ todos: [] });
  }

  readonly add = this.updater((state, payload: { text: string }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: uuidv4(),
        show: true,
        completed: false,
        text: payload.text,
      },
    ],
  }));

  readonly edit = this.updater(
    (state, payload: { id: string; text: string }) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === payload.id ? { ...todo, text: payload.text } : todo
      ),
    })
  );

  readonly remove = this.updater((state, payload: { id: string }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== payload.id),
  }));
}
