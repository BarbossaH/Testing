import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

function renderComponent() {
  const users = [
    { name: 'jane', email: 'mail' },
    { name: 'jame', email: 'mail2' },
  ];

  render(<UserList users={users} />);

  return users;
}

test('render the correct roles', () => {
  //Render the component
  renderComponent();
  //find all the rows in the table
  // screen.logTestingPlaygroundURL();
  // const rows = screen.getAllByRole('row');
  const rows = within(screen.getByTestId('users')).getAllByRole('row');

  const mail2 = screen.getByRole('cell', {
    name: /mail2/i,
  });
  //assertion: correct number of rows of in the table
  expect(mail2).toBeInTheDocument();
  expect(rows).toHaveLength(2); //it will throw an error because it gets three
});

test('render the email and name of each user', () => {
  const users = renderComponent();
  screen.logTestingPlaygroundURL();

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
