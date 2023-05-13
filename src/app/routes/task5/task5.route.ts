import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TitleComponent } from '@ui/title/title.component';

@Component({
  selector: 'hd-task5',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <hd-title title="Task 5" /> `,
  imports: [TitleComponent],
})
export class Task5Route {}
