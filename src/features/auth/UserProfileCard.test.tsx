import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import UserProfileCard from './UserProfileCard';

describe('UserProfileCard', () => {
  it('test_happy_path_undefined_user', () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    render(<UserProfileCard user={user} />);
    expect(screen.getByText('General information')).toBeInTheDocument();
    expect(screen.getByLabelText('name')).toHaveValue('johndoe@example.com');
    expect(screen.getByLabelText('email')).toHaveValue('John Doe');
  });
});
