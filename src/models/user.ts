export interface User {
  name: string;
  email: string;
}

export interface UserRegister extends User {
  password: string;
  confirmPassword: string;
}
export interface UserSignIn extends Pick<User, 'email'> {
  password: string;
}
