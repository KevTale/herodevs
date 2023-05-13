import { RenderResult, render } from '@testing-library/angular';
import { addTodo, removeTodo } from '@utils/tests';

import { Task1Route } from './task1.route';

describe('Task1Route', () => {
  let component: RenderResult<Task1Route>;

  beforeEach(async () => {
    component = await render(Task1Route);
  });

  it('should add todos when the form is filled and submitted', async () => {
    expect(component.getByText(/no todos yet/i)).toBeInTheDocument();

    await addTodo(component, 'Buy butter');
    await addTodo(component, 'Buy chocolate');
    await addTodo(component, 'Buy Milk');

    expect(component.queryByText(/no todos yet/i)).not.toBeInTheDocument();
    expect(component.getAllByRole('listitem')).toHaveLength(3);
  });

  it('should remove todos when the remove button is clicked', async () => {
    await addTodo(component, 'Buy butter');
    await addTodo(component, 'Buy chocolate');

    await removeTodo(component, 'Buy butter');
    expect(component.getAllByRole('listitem')).toHaveLength(1);

    await removeTodo(component, 'Buy chocolate');
    expect(component.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('should not submit the todo if it is less than 3 caracters', async () => {
    await addTodo(component, 'Bu');
    expect(
      component.getByText(/should have at least 3 characters/i)
    ).toBeInTheDocument();
    expect(component.queryAllByRole('listitem')).toHaveLength(0);
  });
});
