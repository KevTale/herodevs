import { RenderResult, render, within } from '@testing-library/angular';

import { Task1Route } from './task1.route';
import userEvent from '@testing-library/user-event';

describe('Task1Route', () => {
  let component: RenderResult<Task1Route>;

  const addTodo = async (text: string) => {
    const input = component.getByPlaceholderText('Buy milk...');
    const submit = component.getByRole('button', { name: /add todo/i });

    await userEvent.type(input, text);
    await userEvent.click(submit);
    await userEvent.clear(input);
  };

  const removeTodo = async (name: string) => {
    const todo = component.getByText(name).closest('li');
    const removeButton = within(todo!).getByRole('button', {
      name: /remove/i,
    });
    await userEvent.click(removeButton);
  };

  beforeEach(async () => {
    component = await render(Task1Route);
  });

  it('should add todos when the form is filled and submitted', async () => {
    expect(component.getByText(/no todos yet/i)).toBeInTheDocument();

    await addTodo('Buy butter');
    await addTodo('Buy chocolate');
    await addTodo('Buy Milk');

    expect(component.queryByText(/no todos yet/i)).not.toBeInTheDocument();
    expect(component.getAllByRole('listitem')).toHaveLength(3);
  });

  it('should remove todos when the remove button is clicked', async () => {
    await addTodo('Buy butter');
    await addTodo('Buy chocolate');

    await removeTodo('Buy butter');
    expect(component.getAllByRole('listitem')).toHaveLength(1);

    await removeTodo('Buy chocolate');
    expect(component.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('should not submit the todo if it is less than 3 caracters', async () => {
    await addTodo('Bu');
    expect(
      component.getByText(/should have at least 3 characters/i)
    ).toBeInTheDocument();
    expect(component.queryAllByRole('listitem')).toHaveLength(0);
  });
});
