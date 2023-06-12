import { render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  it('should call onSubmit function', async () => {
    // Mock dependencies
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    const error = null;

    render(<SignUpForm onSubmit={onSubmit} error={error} />);
    const nameInput = screen.getByLabelText('Username *');
    const emailInput = screen.getByLabelText('Email Address *');
    const passwordInput = screen.getByLabelText('Password *');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password *');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    await user.type(nameInput, 'John');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'Password1!');
    await user.type(confirmPasswordInput, 'Password1!');
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    });
  });

  it('should not call onSubmit on invalid field values', async () => {
    // Mock dependencies
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    const error = null;

    render(<SignUpForm onSubmit={onSubmit} error={error} />);
    const nameInput = screen.getByLabelText('Username *');
    const emailInput = screen.getByLabelText('Email Address *');
    const passwordInput = screen.getByLabelText('Password *');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password *');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    // Set correct values
    await user.type(nameInput, 'John');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'Password1!');
    await user.type(confirmPasswordInput, 'Password1!');

    /// //////////////////

    // change name to invalid value
    await user.clear(nameInput);
    await user.type(nameInput, 'Jo');

    // when
    await user.click(submitButton);
    // then
    expect(onSubmit).not.toHaveBeenCalled();

    // change email to valid value
    await user.clear(nameInput);
    await user.type(nameInput, 'John');

    /// //////////////////

    // change email to invalid value
    await user.clear(emailInput);
    await user.type(emailInput, 'john@example.');

    // when
    await user.click(submitButton);
    // then
    expect(onSubmit).not.toHaveBeenCalled();

    // change email to valid value
    await user.clear(emailInput);
    await user.type(emailInput, 'john@example.com');

    /// //////////////////

    // change password to invalid value
    await user.clear(passwordInput);
    await user.type(passwordInput, 'Password1');

    // when
    await user.click(submitButton);
    // then
    expect(onSubmit).not.toHaveBeenCalled();

    // change password to valid value
    await user.clear(passwordInput);
    await user.type(passwordInput, 'Password1!');

    /// //////////////////

    // change confirm password to invalid value
    await user.clear(confirmPasswordInput);
    await user.type(confirmPasswordInput, 'Password');

    // when
    await user.click(submitButton);
    // then
    expect(onSubmit).not.toHaveBeenCalled();

    // change confirm password to valid value
    await user.clear(confirmPasswordInput);
    await user.type(confirmPasswordInput, 'Password1!');
  });
});
