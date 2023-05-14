import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Todo, TodosStore } from './todos.store';

import { ButtonComponent } from '@ui/button/button.component';

@Component({
  selector: 'hd-edit-todo-with-category',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, NgIf, NgFor],
  template: `
    <hd-button
      (click)="openModal()"
      label="Edit"
      theme="primary"
      type="button"
    />
    <dialog class="rounded-lg" #modal>
      <ng-container *ngIf="isModalOpen()">
        <h2 class="text-2xl">Edit todo: {{ _todo.text }}</h2>
        <form [formGroup]="form" (ngSubmit)="editTodo()">
          <div class="flex flex-col my-2">
            <label for="todoText">Title</label>
            <input
              class="border border-gray-300 rounded-md p-2 outline-none"
              name="todoText"
              id="todoText"
              type="text"
              placeholder="Buy milk..."
              formControlName="todoText"
            />
          </div>
          <div class="flex flex-col my-2">
            <label for="category">Category</label>
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
          </div>
          <div class="flex space-x-2">
            <hd-button
              class="ml-auto"
              type="submit"
              label="Save"
              theme="primary"
            />
            <hd-button
              class="ml-auto"
              (click)="closeModal()"
              label="Cancel"
              theme="danger"
            />
          </div>
        </form>
      </ng-container>
    </dialog>
  `,
})
export class EditTodoWithCategoryComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  _todo!: Todo;
  @Input({ required: true })
  set todo(todo: Todo) {
    this._todo = todo;
    this.form = this.fb.group({
      todoText: [todo.text, [Validators.required, Validators.minLength(3)]],
      category: [todo.category, [Validators.required, Validators.minLength(3)]],
    });
  }

  readonly isModalOpen = signal(false);
  readonly todosStore = inject(TodosStore);
  readonly fb = inject(FormBuilder);
  form!: FormGroup;

  openModal() {
    this.isModalOpen.set(true);
    this.modal.nativeElement.showModal();
  }
  closeModal() {
    this.isModalOpen.set(false);
    this.modal.nativeElement.close();
  }

  editTodo() {
    if (this.form.valid) {
      this.todosStore.editWithCategory({
        id: this._todo.id,
        text: this.form.value.todoText!,
        category: this.form.value.category!,
      });
      this.form.reset();
      this.closeModal();
    }
  }
}
