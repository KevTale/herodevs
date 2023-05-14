import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { ButtonComponent } from '@ui/button/button.component';
import { TodosStore } from './todos.store';

@Component({
  selector: 'hd-add-todo-with-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, ButtonComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="addTodo()">
      <div class="flex space-x-2 align-baseline justify-center">
        <input
          class="border border-gray-300 rounded-md p-2 outline-none"
          list="categories"
          id="category"
          name="category"
          placeholder="Select category"
          formControlName="category"
        />

        <datalist id="categories">
          <option
            *ngFor="let category of todosStore.categories()"
            [value]="category"
          ></option>
        </datalist>

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
            >should have at least 3 characters</small
          >
        </div>

        <hd-button type="submit" label="Add todo" theme="primary" />
      </div>
    </form>
  `,
})
export class AddTodoWithCategoryComponent {
  readonly todosStore = inject(TodosStore);
  readonly fb = inject(FormBuilder);
  readonly form = this.fb.group({
    category: [''],
    todoText: ['', [Validators.required, Validators.minLength(3)]],
  });

  addTodo() {
    if (this.form.valid) {
      this.todosStore.addWithCategory({
        text: this.form.value.todoText!,
        category: this.form.value.category!,
      });
      this.form.reset();
    }
  }
}
