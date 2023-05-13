import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TitleComponent } from '@ui/title/title.component';

@Component({
  selector: 'hd-task1',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <hd-title title="Task 1" /> `,
  imports: [TitleComponent],
})
export class Task1Route {}
