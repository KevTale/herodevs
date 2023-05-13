import { RenderResult } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

export async function addTodo(component: RenderResult<unknown>, name: string) {
  const input = component.getByPlaceholderText('Buy milk...');
  const submit = component.getByRole('button', { name: /add todo/i });

  await userEvent.type(input, name);
  await userEvent.click(submit);
  await userEvent.clear(input);
}
