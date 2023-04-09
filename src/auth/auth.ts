export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      return data.token;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const register = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      return data.token;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const logout = (): void => {
  localStorage.removeItem("token");
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};
