import { RenderResult, screen, within } from '@testing-library/angular';

import userEvent from '@testing-library/user-event';

export async function editTodo({
  component,
  name,
  newName,
  newCategory,
  action,
}: {
  component: RenderResult<unknown>;
  name: string;
  newName?: string;
  newCategory?: string;
  action: 'confirm' | 'cancel';
}) {
  const todo = component.getByText(name).closest('li');
  const editButton = within(todo!).getByRole('button', {
    name: /edit/i,
  });
  await userEvent.click(editButton);

  const dialog = screen.getByRole('dialog');

  if (newName) {
    const titleInput = within(dialog).getByPlaceholderText(/buy milk.../i);
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, newName);
  }

  if (newCategory) {
    const categoryInput =
      within(dialog).getByPlaceholderText(/Select category/i);
    await userEvent.clear(categoryInput);
    await userEvent.type(categoryInput, newCategory);
  }

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
