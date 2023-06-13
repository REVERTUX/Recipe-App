const LOGGED_KEY = 'logged';

export function isLogged(): boolean {
  return !!localStorage.getItem(LOGGED_KEY);
}

export function setLogged(logged: boolean) {
  if (logged) {
    localStorage.setItem(LOGGED_KEY, 'true');
  } else {
    localStorage.removeItem(LOGGED_KEY);
  }
}
