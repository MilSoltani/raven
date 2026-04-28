export type AuthUser = { id: number; username: string };

export type AuthUserWithPassword = AuthUser & {
  password: string;
};

export type TokenType = 'access' | 'refresh';

export type CreateTokenPlan = {
  token: string;
  expiresIn: number;
  familyId: string;
};

import { Request } from 'express';
export interface AuthRequest extends Request {
  user: AuthUser;
}

export interface AuthCookies {
  ACCESS_TOKEN?: string;
  REFRESH_TOKEN?: string;
}

export type JwtPayload = {
  sub: string;
  username: string;
};
