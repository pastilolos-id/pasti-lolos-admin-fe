/** Aligned with backend seed: student 1, contributor 2, admin 3. */
export const STUDENT_ROLE_ID = 1;
export const CONTRIBUTOR_ROLE_ID = 2;
export const ADMIN_ROLE_ID = 3;

export type ApiUser = {
  id: number;
  email: string;
  username: string;
  userRoleId: number;
  firstName?: string;
  lastName?: string;
  fullName: string | null;
  profilePictureUrl: string | null;
};

export type MyProfileResponse = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null;
  userRoleId: number;
  status: string;
  fullName: string | null;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginFieldErrors = Partial<Record<keyof LoginRequest, string[]>>;

export type LoginErrorResponse = {
  statusCode: number;
  message: string;
  errors?: LoginFieldErrors;
};

export type LoginSuccessResponse = {
  message: string;
  user: ApiUser;
};

export type LogoutSuccessResponse = {
  message: string;
};

export type AuthUser = {
  id: number;
  email: string;
  username: string;
  roleId: number;
  fullName: string | null;
  profilePictureUrl: string | null;
};
