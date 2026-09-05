const VALID_USERNAME = 'Aish30';
const VALID_PASSWORD = 'Aish2005';
const TOKEN_KEY = 'docmaster_auth_token';
const TOKEN_DURATION_MS = 30 * 60 * 1000; // 30 Minutes

export type AuthToken = {
  username: string;
  expiresAt: number;
};

export const loginUser = (usernameInput: string, passwordInput: string): { success: boolean; message?: string } => {
  if (usernameInput.trim() === VALID_USERNAME && passwordInput === VALID_PASSWORD) {
    const token: AuthToken = {
      username: VALID_USERNAME,
      expiresAt: Date.now() + TOKEN_DURATION_MS,
    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    return { success: true };
  }
  return { success: false, message: 'Invalid Username or Password' };
};

export const isAuthenticated = (): boolean => {
  const tokenStr = localStorage.getItem(TOKEN_KEY);
  if (!tokenStr) return false;

  try {
    const token: AuthToken = JSON.parse(tokenStr);
    if (Date.now() > token.expiresAt) {
      logoutUser(); // Token expired after 30 mins
      return false;
    }
    return true;
  } catch (e) {
    logoutUser();
    return false;
  }
};

export const getRemainingTimeSeconds = (): number => {
  const tokenStr = localStorage.getItem(TOKEN_KEY);
  if (!tokenStr) return 0;

  try {
    const token: AuthToken = JSON.parse(tokenStr);
    const remaining = Math.max(0, Math.floor((token.expiresAt - Date.now()) / 1000));
    if (remaining === 0) logoutUser();
    return remaining;
  } catch (e) {
    return 0;
  }
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
};
