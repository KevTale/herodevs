import {
  AddTodoWithCategoryComponent,
  EditTodoComponent,
  FilterTodosComponent,
  RemoveTodoComponent,
  TodosListComponent,
  TodosStore,
} from '@features/todos';
import { Component, inject } from '@angular/core';

import { NgIf } from '@angular/common';
import { TitleComponent } from '@ui/title/title.component';

@Component({
  selector: 'hd-task4',
  standalone: true,
  template: `
    <hd-title title="Task 4" />
    <hd-add-todo-with-category />

    <div class="my-4">
      <hd-filter-todos *ngIf="todosStore.hasTodos()" />
      <hd-todos-list
        [withCategory]="true"
        [todos]="todosStore.todos"
        [todoFooterTemplate]="todoFooterTemplate"
      />

      <ng-template #todoFooterTemplate let-todo>
        <hd-edit-todo [todo]="todo" />
        <hd-remove-todo [withConfirmation]="true" [id]="todo.id" />
      </ng-template>
    </div>
  `,
  imports: [
    AddTodoWithCategoryComponent,
    TodosListComponent,
    TitleComponent,
    RemoveTodoComponent,
    EditTodoComponent,
    FilterTodosComponent,
    NgIf,
  ],
})
export class Task4Route {
  readonly todosStore = inject(TodosStore);
}
