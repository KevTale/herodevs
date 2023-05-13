import { Component, Input, inject } from '@angular/core';

import { ButtonComponent } from '@ui/button/button.component';
import { TodosStore } from './todos.store';

@Component({
  selector: 'hd-remove-todo',
  imports: [ButtonComponent],
  standalone: true,
  template: `
    <hd-button label="Remove" theme="danger" type="button" (click)="remove()" />
  `,
})
export class RemoveTodoComponent {
  @Input({ required: true }) id!: string;
  readonly todosStore = inject(TodosStore);

  remove() {
    this.todosStore.remove({ id: this.id });
  }
}
