import { RenderResult, render, screen, within } from '@testing-library/angular';

import { Task4Route } from './task4.route';
import { addTodoWithCategory } from '@utils/tests/add-todo';
import { removeTodo } from '@utils/tests';
import userEvent from '@testing-library/user-event';

describe('Task4Route', () => {
  let component: RenderResult<Task4Route>;
  let todoListComponent: HTMLElement;

  const getTodosByCategory = (category: string) =>
    within(todoListComponent)
      .getAllByRole('listitem')
      .filter((todo) => within(todo).queryByText(category));

  beforeEach(async () => {
    component = await render(Task4Route);
    todoListComponent =
      component.fixture.nativeElement.querySelector('hd-todos-list');
  });
  it('should be able to filter todos ', async () => {
    await addTodoWithCategory({
      component,
      name: 'Buy butter',
      category: 'Shopping',
    });
    await addTodoWithCategory({
      component,
      name: 'Buy chocolate',
      category: 'Shopping',
    });
    await addTodoWithCategory({
      component,
      name: 'Buy Diablo 4',
      category: 'Video games',
    });
    await addTodoWithCategory({
      component,
      name: 'Buy Cyberpunk 2077',
      category: 'Video games',
    });

    expect(getTodosByCategory('Video games')).toHaveLength(2);
    expect(getTodosByCategory('Shopping')).toHaveLength(2);

    // we filter out the shopping category
    const shoppingCheckbox = component.getByRole('checkbox', {
      name: /Shopping/i,
    });
    await userEvent.click(shoppingCheckbox);

    expect(getTodosByCategory('Video games')).toHaveLength(2);
    expect(getTodosByCategory('Shopping')).toHaveLength(0);

    // we bring back the shopping category
    await userEvent.click(shoppingCheckbox);

    expect(getTodosByCategory('Video games')).toHaveLength(2);
    expect(getTodosByCategory('Shopping')).toHaveLength(2);
  });

  it('should remove the category if the last attached todo is removed', async () => {
    window.confirm = jest.fn(() => true);

    await addTodoWithCategory({
      component,
      name: 'Buy butter',
      category: 'Shopping',
    });
    await addTodoWithCategory({
      component,
      name: 'Buy chocolate',
      category: 'Shopping',
    });
    await addTodoWithCategory({
      component,
      name: 'Buy Diablo 4',
      category: 'Video games',
    });

    const shoppingCheckbox = component.getByRole('checkbox', {
      name: /Shopping/i,
    });

    expect(shoppingCheckbox).toBeInTheDocument();

    await removeTodo({
      component,
      name: 'Buy butter',
    });
    await removeTodo({
      component,
      name: 'Buy chocolate',
    });

    expect(shoppingCheckbox).not.toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
