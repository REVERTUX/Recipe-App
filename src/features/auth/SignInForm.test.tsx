import { render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import SignInForm from './SignInForm';

describe('SignInForm', () => {
  it('should call onSubmit function', async () => {
    // Mock dependencies
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<SignInForm onSubmit={onSubmit} error={null} />);
    const emailInput = screen.getByLabelText('Email Address *');
    const passwordInput = screen.getByLabelText('Password *');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'password');
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password',
    });
  });

  it('should validate email', async () => {
    // Mock dependencies
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<SignInForm onSubmit={onSubmit} error={null} />);
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    await user.click(submitButton);

    expect(
      screen.getByText('Please provide email address')
    ).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });
});
