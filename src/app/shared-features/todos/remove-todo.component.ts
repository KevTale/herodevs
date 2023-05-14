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
  @Input() withConfirmation = false;
  readonly todosStore = inject(TodosStore);

  remove() {
    if (!this.withConfirmation) {
      this.todosStore.remove({ id: this.id });
      return;
    }

    const todo = this.todosStore.todo(this.id);

    if (
      confirm(
        `Are you sure you want to remove "${todo()?.category} - ${
          todo()?.text
        }"?`
      )
    ) {
      this.todosStore.remove({ id: this.id });
    }
  }
}
