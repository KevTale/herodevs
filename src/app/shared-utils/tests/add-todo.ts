import { RenderResult } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

export async function addTodo({
  component,
  name,
}: {
  component: RenderResult<unknown>;
  name: string;
}) {
  const input = component.getByPlaceholderText('Buy milk...');
  const submit = component.getByRole('button', { name: /add todo/i });

  await userEvent.type(input, name);
  await userEvent.click(submit);
  await userEvent.clear(input);
}

export async function addTodoWithCategory({
  component,
  name,
  category,
}: {
  component: RenderResult<unknown>;
  name: string;
  category: string;
}) {
  const categoryInput = component.getByPlaceholderText('Select category');
  const todoTextInput = component.getByPlaceholderText('Buy milk...');
  const submit = component.getByRole('button', { name: /add todo/i });

  await userEvent.type(categoryInput, category);
  await userEvent.type(todoTextInput, name);
  await userEvent.click(submit);
}
