import { CreationOptional } from "sequelize";

export interface IUser {
  name?: string;
  password: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
  checkPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  googleId?: string;
}

export interface IContact {
  id?: CreationOptional<number>;
  name: string;
  phone: string;
}

export interface QueryParams {
  name?: string | null;
  page?: number;
  limit?: number;
}
