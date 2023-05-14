import { RenderResult, within } from '@testing-library/angular';

import userEvent from '@testing-library/user-event';

export async function removeTodo({
  component,
  name,
}: {
  component: RenderResult<unknown>;
  name: string;
}) {
  const todo = component.getByText(name).closest('li');
  const removeButton = within(todo!).getByRole('button', {
    name: /remove/i,
  });
  await userEvent.click(removeButton);
}
