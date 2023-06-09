import { Component, inject } from '@angular/core';
import {
  RemoveTodoComponent,
  TodosListComponent,
  TodosStore,
} from '@features/todos';

import { AddTodoWithCategoryComponent } from '@features/todos/add-todo-with-category.component';
import { EditTodoWithCategoryComponent } from '@features/todos/edit-todo-with-category.component';
import { FilterTodosComponent } from '@features/todos/filters-todos.component';
import { NgIf } from '@angular/common';
import { TitleComponent } from '@ui/title/title.component';

@Component({
  selector: 'hd-task5',
  standalone: true,
  template: `
    <hd-title title="Task 5" />
    <hd-add-todo-with-category />

    <div class="my-4">
      <hd-filter-todos *ngIf="todosStore.hasTodos()" />
      <hd-todos-list
        [withCategory]="true"
        [todos]="todosStore.todos"
        [todoFooterTemplate]="todoFooterTemplate"
      />

      <ng-template #todoFooterTemplate let-todo>
        <hd-edit-todo-with-category [todo]="todo" />
        <hd-remove-todo [withConfirmation]="true" [id]="todo.id" />
      </ng-template>
    </div>
  `,
  imports: [
    AddTodoWithCategoryComponent,
    TodosListComponent,
    TitleComponent,
    RemoveTodoComponent,
    EditTodoWithCategoryComponent,
    FilterTodosComponent,
    NgIf,
  ],
})
export class Task5Route {
  readonly todosStore = inject(TodosStore);
}
