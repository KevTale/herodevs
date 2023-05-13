import { Component, Input, TemplateRef, inject } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

import { TodosStore } from './todos.store';

@Component({
  selector: 'hd-todos-list',
  standalone: true,
  imports: [NgFor, NgIf, NgTemplateOutlet],
  template: `
    <h3 *ngIf="!todosStore.hasTodos()" class="text-center">No todos yet</h3>
    <ul
      class="grid grid-cols-[repeat(auto-fit,_minmax(min-content,_25rem))] gap-4"
    >
      <ng-container *ngFor="let todo of todos(); trackBy: trackByTodoId">
        <li
          *ngIf="todo.show"
          class="shadow-md rounded-lg border p-4 flex flex-col"
        >
          <main class="flex justify-between align-baseline mb-6">
            <p class="text-xl font-bold">{{ todo.text }}</p>
          </main>
          <footer class="flex ml-auto space-x-2">
            <ng-container
              *ngTemplateOutlet="
                todoFooterTemplate;
                context: { $implicit: todo }
              "
            ></ng-container>
          </footer>
        </li>
      </ng-container>
    </ul>
  `,
})
export class TodosListComponent {
  readonly todosStore = inject(TodosStore);

  @Input({ required: true }) todoFooterTemplate!: TemplateRef<any>;
  @Input() todos = this.todosStore.todos;
  @Input() withCategory = false;

  trackByTodoId(index: number, todo: { id: string }) {
    return todo.id;
  }
}
