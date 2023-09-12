import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
  //render the component
  render(<UserForm />);
  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  //Assertion - make sure the component is doing
  //what we expert it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('it call onUserAdd when the form is submitted', () => {
  //not the best implementation
  // const argList = [];
  // const callback = (...arg) => {
  //   argList.push(arg);
  // };
  const mock = jest.fn();
  // try to render my component
  render(<UserForm onUserAdd={mock} />);
  //find the two inputs
  // const [nameInput, emailInput] = screen.getAllByRole('textbox'); //this is not a good way.
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  // const emailInput = screen.getByRole('textbox',{name:/enter email/i}) //both ok
  const emailInput = screen.getByRole('textbox', { name: /email/i });

  //these two ways are both ok
  // screen.getByLabelText(/enter email/i);
  // screen.getByRole('textbox', { name: /enter email/i });

  //simulate typing in a name
  user.click(nameInput);
  user.keyboard('jane');
  //simulate typing in an email
  user.click(emailInput);
  user.keyboard('jane@gmail.com');
  // find the button
  const button = screen.getByRole('button');
  // simulate clicking the button
  user.click(button);

  //assertion to make sure 'onUserAdd' gets called with email/name

  // expect(argList).toHaveLength(1);
  // expect(argList[0][0]).toEqual({ name: 'jane', email: 'jane@gmail.com' });

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@gmail.com' });
});

test('empties the two inputs when form is submitted', async () => {
  render(<UserForm onUserAdd={() => {}} />);
  const nameInput = screen.getByRole('textbox', {
    name: /name/i,
  });
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  });

  const button = screen.getByRole('button');
  // user.click(nameInput);
  // user.keyboard('buddha');
  user.type(nameInput, 'buddha');
  user.type(emailInput, 'buddha@buddha.com');

  user.click(button);

  await waitFor(() => {
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });
});
