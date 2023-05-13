import {
  AddTodoComponent,
  RemoveTodoComponent,
  TodosListComponent,
  TodosStore,
} from '@features/todos';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { ButtonComponent } from '@ui/button/button.component';
import { TitleComponent } from '@ui/title/title.component';

@Component({
  selector: 'hd-task1',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hd-title title="Task 1" />
    <hd-add-todo />

    <div class="my-4">
      <hd-todos-list [todoFooterTemplate]="todoFooterTemplate" />

      <ng-template #todoFooterTemplate let-todo>
        <hd-remove-todo [id]="todo.id" />
      </ng-template>
    </div>
  `,
  imports: [
    TitleComponent,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    ButtonComponent,
    AddTodoComponent,
    TodosListComponent,
    RemoveTodoComponent,
  ],
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
