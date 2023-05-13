import { Component, Input } from '@angular/core';

@Component({
  selector: 'hd-title',
  standalone: true,
  template: `
    <h2 class="text-3xl font-bold text-center mb-4">{{ title }}</h2>
  `,
})
export class TitleComponent {
  @Input() title!: string;
}
