import { RenderResult, render, screen } from '@testing-library/angular';
import { addTodo, editTodo } from '@utils/tests';

import { Task2Route } from './task2.route';

describe('Task2Route', () => {
  let component: RenderResult<Task2Route>;

  beforeEach(async () => {
    component = await render(Task2Route);

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
  it('should be able to edit todo', async () => {
    await addTodo({
      component,
      name: 'Buy butter',
    });

    await editTodo({
      component,
      name: 'Buy butter',
      newName: 'Buy chocolate',
      action: 'confirm',
    });

    expect(component.getByText(/buy chocolate/i)).toBeInTheDocument();
  });

  it('should not update todo when the dialog is cancelled', async () => {
    await addTodo({
      component,
      name: 'Buy butter',
    });
    await editTodo({
      component,
      name: 'Buy butter',
      newName: 'Buy chocolate',
      action: 'cancel',
    });

    expect(component.getByText(/buy butter/i)).toBeInTheDocument();
  });
});
