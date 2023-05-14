import { RenderResult, render, within } from '@testing-library/angular';

import { Task3Route } from './task3.route';
import { addTodoWithCategory } from '@utils/tests/add-todo';

describe('Task3Route', () => {
  let component: RenderResult<Task3Route>;

  beforeEach(async () => {
    component = await render(Task3Route);
  });
  it('should be able to add a todo with an attached category', async () => {
    await addTodoWithCategory({
      component,
      name: 'Buy butter',
      category: 'Shopping',
    });

    const todo = component.getByText('Buy butter').closest('li');
    expect(within(todo!).getByText(/Shopping/i)).toBeInTheDocument();
  });
});
