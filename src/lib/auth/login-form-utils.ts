import type { FieldValues, UseFormSetError } from "react-hook-form";

import type {
  ApiUser,
  AuthUser,
  LoginErrorResponse,
  LoginRequest,
  MyProfileResponse,
} from "./types";

const LOGIN_FIELD_KEYS = [
  "email",
  "password",
] as const satisfies readonly (keyof LoginRequest)[];

export function applyLoginFieldErrors(
  setError: UseFormSetError<FieldValues>,
  errors: NonNullable<LoginErrorResponse["errors"]>,
): void {
  for (const key of LOGIN_FIELD_KEYS) {
    const messages = errors[key];
    if (messages?.length) {
      setError(key, {
        type: "server",
        message: messages[0],
      });
    }
  }
}

export function normalizeLoginPayload(
  data: Record<string, unknown>,
): LoginRequest {
  return {
    email: String(data.email ?? "").trim(),
    password: String(data.password ?? ""),
  };
}

export function mapApiUserToAuthUser(apiUser: ApiUser): AuthUser {
  return {
    id: apiUser.id,
    email: apiUser.email,
    username: apiUser.username,
    roleId: apiUser.userRoleId,
    fullName: apiUser.fullName,
    profilePictureUrl: apiUser.profilePictureUrl,
  };
}

export function mapMyProfileToAuthUser(profile: MyProfileResponse): AuthUser {
  return {
    id: profile.id,
    email: profile.email,
    username: profile.username,
    roleId: profile.userRoleId,
    fullName: profile.fullName,
    profilePictureUrl: profile.profilePictureUrl,
  };
}
