import { Component, OnInit, inject } from '@angular/core';

import { NgFor } from '@angular/common';
import { TodosStore } from './todos.store';

@Component({
  selector: 'hd-filter-todos',
  standalone: true,
  imports: [NgFor],
  host: { class: 'grid mb-4' },
  template: `
    <h3 class="text-3xl font-bold mb-0">Filters</h3>
    <h4 class="text-xl">Categories</h4>
    <ul class="flex space-x-2">
      <li
        class="flex items-center space-x-1"
        *ngFor="
          let category of todosStore.categories();
          trackBy: trackByCategoriesName
        "
      >
        <input
          (change)="toggle({ event: $event, category })"
          checked
          type="checkbox"
          [id]="category"
          [name]="category"
        />
        <label [for]="category">{{ category }}</label>
      </li>
    </ul>
  `,
})
export class FilterTodosComponent {
  readonly todosStore = inject(TodosStore);

  trackByCategoriesName(index: number, category: string) {
    return category;
  }

  toggle(data: { event: Event; category: string }) {
    const checkbox = data.event.target as HTMLInputElement;
    this.todosStore.toggleCategoryFilter({
      category: data.category,
      checked: checkbox.checked,
    });
  }
}
