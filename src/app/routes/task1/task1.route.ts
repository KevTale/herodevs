import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hd-task1',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` Task1Route`,
})
export class Task1Route {}
