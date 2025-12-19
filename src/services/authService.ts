const TOKEN_KEY = "auth_token";

interface User {
  id: number;
  username: string;
  password: string;
  token: string;
  name: string;
  role: string;
}

interface UserData {
  id: number;
  username: string;
  name: string;
  token: string;
  role: string;
}

interface LoginResult {
  success: boolean;
  user?: UserData;
  message?: string;
}

interface DataJson {
  users?: User[];
  products?: unknown[];
  employees?: unknown[];
  revenue?: unknown;
  productsSold?: unknown;
}

async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch("/data.json");
    const data: DataJson = await response.json();
    return data.users || [];
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
}

export async function login(
  username: string,
  password: string
): Promise<LoginResult> {
  const users = await getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem(TOKEN_KEY, user.token);
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        token: user.token,
        role: user.role,
      },
    };
  }

  return {
    success: false,
    message: "Tên đăng nhập hoặc mật khẩu không đúng",
  };
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

export async function validateToken(token: string | null): Promise<boolean> {
  if (!token) return false;

  const users = await getUsers();
  return users.some((u) => u.token === token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;
  return await validateToken(token);
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export async function getCurrentUser(): Promise<UserData | null> {
  const token = getToken();
  if (!token) return null;

  const users = await getUsers();
  const user = users.find((u) => u.token === token);

  if (user) {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      token: user.token,
      role: user.role,
    };
  }

  return null;
}
