import { Component, Input } from '@angular/core';

type ButtonType = 'submit' | 'button' | 'reset';
type ButtonTheme = 'primary' | 'danger';

@Component({
  selector: 'hd-button',
  standalone: true,
  template: `
    <button
      class="border border-gray-300 rounded-md px-4 py-2  text-white"
      [class.bg-blue-700]="theme === 'primary'"
      [class.bg-red-500]="theme === 'danger'"
      [type]="type"
    >
      {{ label }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() type: ButtonType = 'button';
  @Input() theme: ButtonTheme = 'primary';
  @Input({ required: true }) label!: string;
}
