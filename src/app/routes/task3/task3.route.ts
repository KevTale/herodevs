import {
  EditTodoComponent,
  RemoveTodoComponent,
  TodosListComponent,
} from '@features/todos';

import { AddTodoWithCategoryComponent } from '@features/todos/add-todo-with-category.component';
import { Component } from '@angular/core';
import { TitleComponent } from '@ui/title/title.component';

@Component({
  selector: 'hd-task3',
  standalone: true,
  template: `
    <hd-title title="Task 3" />
    <hd-add-todo-with-category />
    <div class="my-4">
      <hd-todos-list
        [withCategory]="true"
        [todoFooterTemplate]="todoFooterTemplate"
      />

      <ng-template #todoFooterTemplate let-todo>
        <hd-edit-todo [todo]="todo" />
        <hd-remove-todo [id]="todo.id" />
      </ng-template>
    </div>
  `,
  imports: [
    AddTodoWithCategoryComponent,
    TodosListComponent,
    TitleComponent,
    RemoveTodoComponent,
    EditTodoComponent,
  ],
})
export class Task3Route {}
