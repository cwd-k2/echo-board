// 本来ならもっと安全な場所に置いたりするべきだろう
// 今回は面倒なので LocalStorage

// 保存するための User 構造体
export type AuthUser = {
  id: string;
  displayName: string;
  accountName: string;
};

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function getAuthUser(): AuthUser | null {
  const json = localStorage.getItem('authUser');
  if (json === null) return null;

  return JSON.parse(json);
}

export function setToken(token: string | null): void {
  if (token === null) {
    localStorage.removeItem('token');
  } else {
    localStorage.setItem('token', token);
  }
}

export function setAuthUser(user: AuthUser | null): void {
  if (user === null) {
    localStorage.removeItem('authUser');
  } else {
    const json = JSON.stringify({
      id: user.id,
      displayName: user.displayName,
      accountName: user.accountName,
    });
    localStorage.setItem('authUser', json);
  }
}
