export interface UserProfile {
  id: string;
  name: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
  provider: 'password' | 'google';
}

const CURRENT_USER_KEY = 'docmaster_current_user_v1';
const TOKEN_KEY = 'docmaster_jwt_token_v1';

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
};

export const setCurrentUser = (user: UserProfile) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to set active user', e);
  }
};

export const getCurrentUser = (): UserProfile | null => {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export const logoutUser = () => {
  removeToken();
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// API Integration with Next.js Backend Server & MongoDB

export const sendOtpApi = async (
  email: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return { success: response.ok && data.success, message: data.message };
  } catch (err: any) {
    console.error('Send OTP API Error:', err);
    return { success: false, message: 'Unable to connect to OTP server.' };
  }
};

export const verifyOtpApi = async (
  email: string,
  otp: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    return { success: response.ok && data.success, message: data.message };
  } catch (err: any) {
    console.error('Verify OTP API Error:', err);
    return { success: false, message: 'Unable to verify OTP.' };
  }
};

export const registerUserApi = async (
  name: string,
  username: string,
  email: string,
  phoneNumber: string,
  passwordInput: string
): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        email,
        phoneNumber,
        password: passwordInput,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { success: false, message: data.message || 'Registration failed.' };
    }

    if (data.token) {
      setToken(data.token);
    }
    if (data.user) {
      setCurrentUser(data.user);
    }

    return { success: true, user: data.user, message: data.message };
  } catch (err: any) {
    console.error('Register API Error:', err);
    return { success: false, message: 'Unable to connect to authentication server.' };
  }
};

export const loginUserApi = async (
  emailOrUsername: string,
  passwordInput: string
): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailOrUsername,
        password: passwordInput,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { success: false, message: data.message || 'Invalid email or password.' };
    }

    if (data.token) {
      setToken(data.token);
    }
    if (data.user) {
      setCurrentUser(data.user);
    }

    return { success: true, user: data.user, message: data.message };
  } catch (err: any) {
    console.error('Login API Error:', err);
    return { success: false, message: 'Unable to connect to authentication server.' };
  }
};

export const loginWithGoogleApi = async (
  credentialToken: string
): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
  try {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credential: credentialToken,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { success: false, message: data.message || 'Google sign-in failed.' };
    }

    if (data.token) {
      setToken(data.token);
    }
    if (data.user) {
      setCurrentUser(data.user);
    }

    return { success: true, user: data.user, message: data.message };
  } catch (err: any) {
    console.error('Google Auth API Error:', err);
    return { success: false, message: 'Unable to connect to Google authentication server.' };
  }
};

export const fetchCurrentUserApi = async (): Promise<UserProfile | null> => {
  const token = getToken();
  if (!token) {
    return getCurrentUser();
  }

  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      logoutUser();
      return null;
    }

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        return data.user;
      }
    }
  } catch (err) {
    console.warn('Could not verify token with backend server:', err);
  }

  return getCurrentUser();
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
