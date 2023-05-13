import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TitleComponent } from '@ui/title/title.component';

@Component({
  selector: 'hd-task2',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <hd-title title="Task 2" /> `,
  imports: [TitleComponent],
})
export class Task2Route {}
