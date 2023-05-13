import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export type Todo = {
  id: string;
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

  constructor() {
    super({ todos: [] });
  }

  readonly add = this.updater((state, payload: { text: string }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: uuidv4(),
        completed: false,
        text: payload.text,
      },
    ],
  }));

  readonly remove = this.updater((state, payload: { id: string }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== payload.id),
  }));
}
