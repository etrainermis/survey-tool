
interface User {
  email: string;
  id: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// This would be replaced with actual backend authentication
const MOCK_USERS = [
  { email: "test@example.com", password: "password123", id: "1" },
];

export const authenticateUser = (email: string, password: string): AuthState => {
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const authState = { user: { email: user.email, id: user.id }, isAuthenticated: true };
  localStorage.setItem("authState", JSON.stringify(authState));
  return authState;
};

export const getAuthState = (): AuthState => {
  const authState = localStorage.getItem("authState");
  return authState ? JSON.parse(authState) : { user: null, isAuthenticated: false };
};

export const logout = () => {
  localStorage.removeItem("authState");
};
