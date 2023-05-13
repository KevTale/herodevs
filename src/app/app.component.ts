import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'hd-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="bg-blue-500 p-4">
      <nav class="flex">
        <ul class="flex space-x-2 text-white hover:[&_li]:text-yellow-500">
          <li>
            <a routerLinkActive="text-yellow-500" routerLink="/task-1"
              >Task 1</a
            >
          </li>
          <li>
            <a routerLinkActive="text-yellow-500" routerLink="/task-2"
              >Task 2</a
            >
          </li>
          <li>
            <a routerLinkActive="text-yellow-500" routerLink="/task-3"
              >Task 3</a
            >
          </li>
          <li>
            <a routerLinkActive="text-yellow-500" routerLink="/task-4"
              >Task 4</a
            >
          </li>
          <li>
            <a routerLinkActive="text-yellow-500" routerLink="/task-5"
              >Task 5</a
            >
          </li>
        </ul>
      </nav>
    </header>
    <main class="p-4">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
