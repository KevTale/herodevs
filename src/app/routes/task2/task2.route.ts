import {
  EditTodoComponent,
  RemoveTodoComponent,
  TodosListComponent,
} from '@features/todos';

import { AddTodoComponent } from '../../shared-features/todos/add-todo.component';
import { Component } from '@angular/core';
import { TitleComponent } from '@ui/title/title.component';

@Component({
  selector: 'hd-task2',
  standalone: true,
  template: `
    <hd-title title="Task 2" />
    <hd-add-todo />
    <div class="my-4">
      <hd-todos-list [todoFooterTemplate]="todoFooterTemplate" />

      <ng-template #todoFooterTemplate let-todo>
        <hd-edit-todo [todo]="todo" />
        <hd-remove-todo [id]="todo.id" />
      </ng-template>
    </div>
  `,
  imports: [
    AddTodoComponent,
    TodosListComponent,
    TitleComponent,
    RemoveTodoComponent,
    EditTodoComponent,
  ],
})
export class Task2Route {}
