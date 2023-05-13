import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TitleComponent } from '@ui/title/title.component';

@Component({
  selector: 'hd-task3',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <hd-title title="Task 3" /> `,
  imports: [TitleComponent],
})
export class Task3Route {}
