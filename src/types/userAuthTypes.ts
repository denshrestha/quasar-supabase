export type userAuth = {
  email: string;
  id: string,
  fullName: string,
  username: string,
}

export type sessionType = {
  token: string;
  expiresAt: number | undefined;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}
