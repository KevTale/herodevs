import { RenderResult, render, within } from '@testing-library/angular';

import { Task5Route } from './task5.route';
import { addTodoWithCategory } from '@utils/tests/add-todo';
import { editTodo } from '@utils/tests';

describe('Task5Route', () => {
  let component: RenderResult<Task5Route>;

  beforeEach(async () => {
    component = await render(Task5Route);

    HTMLDialogElement.prototype.show = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.showModal = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.close = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = false;
    });
  });
  it('should be able to edit the category of a todo', async () => {
    await addTodoWithCategory({
      component,
      name: 'Buy butter',
      category: 'Shopping',
    });
    const shoppingCheckbox = component.getByRole('checkbox', {
      name: /Shopping/i,
    });
    expect(shoppingCheckbox).toBeInTheDocument();

    await editTodo({
      component,
      name: 'Buy butter',
      newCategory: 'Work',
      action: 'confirm',
    });
    expect(shoppingCheckbox).not.toBeInTheDocument();
    const workCheckbox = component.getByRole('checkbox', {
      name: /Work/i,
    });
    expect(workCheckbox).toBeInTheDocument();
  });
});
