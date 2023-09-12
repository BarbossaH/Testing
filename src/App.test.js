import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('can receive a new user and show it on a list', async () => {
  render(<App />);
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

  screen.debug();
  await screen.findByText('buddha'); // Wait for the "buddha" text to appear
  await screen.findByText('buddha@buddha.com'); // Wait for the "buddha@buddha.com" text to appear

  // Get the name and email elements by text and perform assertions
  const name = screen.getByText('buddha');
  const email = screen.getByText('buddha@buddha.com');

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
