import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TitleComponent } from '@ui/title/title.component';

@Component({
  selector: 'hd-task4',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <hd-title title="Task 4" /> `,
  imports: [TitleComponent],
})
export class Task4Route {}
