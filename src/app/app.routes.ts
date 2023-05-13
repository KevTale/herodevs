import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'task-1',
    pathMatch: 'full',
  },
  {
    path: 'task-1',
    loadChildren: () => import('@routes/task1/task1.routing'),
  },
  {
    path: 'task-2',
    loadChildren: () => import('@routes/task2/task2.routing'),
  },
  {
    path: 'task-3',
    loadChildren: () => import('@routes/task3/task3.routing'),
  },
  {
    path: 'task-4',
    loadChildren: () => import('@routes/task4/task4.routing'),
  },
  {
    path: 'task-5',
    loadChildren: () => import('@routes/task5/task5.routing'),
  },
  {
    path: '**',
    redirectTo: 'task-1',
  },
];
