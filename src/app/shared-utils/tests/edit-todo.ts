import {
  RenderResult,
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/angular';

import userEvent from '@testing-library/user-event';

export async function editTodo({
  component,
  name,
  newName,
  action,
}: {
  component: RenderResult<unknown>;
  name: string;
  newName: string;
  action: 'confirm' | 'cancel';
}) {
  const todo = component.getByText(name).closest('li');
  const editButton = within(todo!).getByRole('button', {
    name: /edit/i,
  });
  await userEvent.click(editButton);

  const dialog = screen.getByRole('dialog');

  const titleInput = within(dialog).getByDisplayValue(name);

  await userEvent.clear(titleInput);
  await userEvent.type(titleInput, newName);
  if (action === 'confirm') {
    const save = screen.getByRole('button', {
      name: /save/i,
    });
    await userEvent.click(save);
  }

  if (action === 'cancel') {
    const cancel = screen.getByRole('button', {
      name: /cancel/i,
    });
    await userEvent.click(cancel);
  }
}
