import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { ButtonComponent } from '@ui/button/button.component';
import { TitleComponent } from '@ui/title/title.component';
import { TodosStore } from '@features/todos/todos.store';

@Component({
  selector: 'hd-task1',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hd-title title="Task 1" />
    <form [formGroup]="form" (ngSubmit)="addTodo()">
      <div class="flex space-x-2 align-baseline justify-center">
        <div class="flex flex-col">
          <input
            class="border border-gray-300 rounded-md p-2 outline-none"
            name="todoText"
            id="todoText"
            type="text"
            placeholder="Buy milk..."
            formControlName="todoText"
          />
          <small
            class="text-red-500"
            *ngIf="
              form.controls['todoText'].invalid &&
              form.controls['todoText'].touched &&
              !form.controls['todoText'].pristine
            "
            >Should have at least 3 characters</small
          >
        </div>
        <hd-button type="submit" label="Add todo" theme="primary" />
      </div>
    </form>

    <div class="my-4">
      <h3 *ngIf="!todosStore.hasTodos()" class="text-center">No todos yet</h3>
      <ul
        class="grid grid-cols-[repeat(auto-fit,_minmax(min-content,_25rem))] gap-4"
      >
        <li
          *ngFor="let todo of todosStore.todos(); trackBy: trackByTodoId"
          class="shadow-md rounded-lg border p-4 flex flex-col"
        >
          <main class="flex justify-between align-baseline mb-6">
            <p class="text-xl font-bold">{{ todo.text }}</p>
          </main>
          <footer class="flex ml-auto space-x-2">
            <hd-button
              label="Remove"
              theme="danger"
              type="button"
              (click)="remove(todo.id)"
            />
          </footer>
        </li>
      </ul>
    </div>
  `,
  imports: [TitleComponent, ReactiveFormsModule, NgIf, NgFor, ButtonComponent],
})
export class Task1Route {
  readonly todosStore = inject(TodosStore);
  readonly fb = inject(FormBuilder);
  readonly form = this.fb.group({
    todoText: ['', [Validators.required, Validators.minLength(3)]],
  });

  addTodo() {
    if (this.form.valid) {
      this.todosStore.add({
        text: this.form.value.todoText!,
      });
      this.form.reset();
    }
  }

  remove(id: string) {
    this.todosStore.remove({ id });
  }

  trackByTodoId(index: number, todo: { id: string }) {
    return todo.id;
  }
}
