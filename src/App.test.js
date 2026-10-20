import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the library sections and navigation', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /a place to grow together/i })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /room for every kind of curiosity/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /saturday story circle/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /the secret garden/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute('href', '#contact');
  expect(screen.getAllByText(/rusizi district/i)).toHaveLength(2);
  expect(screen.getAllByText(/western province, rwanda/i)).toHaveLength(2);
});

test('validates the contact form and reports successful submission', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /send your message/i }));
  expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument();
  expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
  expect(screen.getByText(/please write us a message/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Taylor Reader' } });
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'not-an-email' } });
  fireEvent.change(screen.getByLabelText(/your message/i), { target: { value: 'Hello, library!' } });
  fireEvent.click(screen.getByRole('button', { name: /send your message/i }));
  expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  expect(screen.queryByText(/thanks for reaching out/i)).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'taylor@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /send your message/i }));
  expect(screen.getByRole('status')).toHaveTextContent(/thanks for reaching out/i);
});
