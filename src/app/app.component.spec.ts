import { render, screen } from '@testing-library/angular';

import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { Task1Route } from './routes/task1/task1.route';
import { Task2Route } from './routes/task2/task2.route';
import { Task3Route } from './routes/task3/task3.route';
import { Task4Route } from './routes/task4/task4.route';
import { Task5Route } from './routes/task5/task5.route';

describe('AppComponent', () => {
  const routes: Routes = [
    {
      path: '',
      redirectTo: 'task-1',
      pathMatch: 'full',
    },
    {
      path: 'task-1',
      component: Task1Route,
    },
    {
      path: 'task-2',
      component: Task2Route,
    },
    {
      path: 'task-3',
      component: Task3Route,
    },
    {
      path: 'task-4',
      component: Task4Route,
    },
    {
      path: 'task-5',
      component: Task5Route,
    },
    {
      path: '**',
      redirectTo: 'task-1',
    },
  ];

  it('should show navigation with 5 "tasks" links', async () => {
    await render(AppComponent);

    expect(screen.getByRole('link', { name: /task 1/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /task 2/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /task 3/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /task 4/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /task 5/i })).toBeInTheDocument();
  });

  it("should default to 'Task 1' when no route is specified or 404", async () => {
    const { navigate } = await render(AppComponent, {
      routes,
    });

    expect(
      screen.getByRole('heading', { name: /task 1/i })
    ).toBeInTheDocument();

    await navigate('non-existent-route');

    expect(
      screen.getByRole('heading', { name: /task 1/i })
    ).toBeInTheDocument();
  });

  it('should navigate to the correct task when a link is clicked', async () => {
    const { navigate } = await render(AppComponent, {
      routes,
    });

    await navigate('task-1');
    expect(
      screen.getByRole('heading', { name: /task 1/i })
    ).toBeInTheDocument();

    await navigate('task-2');
    expect(
      screen.getByRole('heading', { name: /task 2/i })
    ).toBeInTheDocument();

    await navigate('task-3');
    expect(
      screen.getByRole('heading', { name: /task 3/i })
    ).toBeInTheDocument();

    await navigate('task-4');
    expect(
      screen.getByRole('heading', { name: /task 4/i })
    ).toBeInTheDocument();

    await navigate('task-5');
    expect(
      screen.getByRole('heading', { name: /task 5/i })
    ).toBeInTheDocument();
  });
});
