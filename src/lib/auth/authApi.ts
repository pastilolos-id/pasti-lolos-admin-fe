import { apiFetch } from "./api-client";
import type {
  LoginRequest,
  LoginSuccessResponse,
  LogoutSuccessResponse,
  MyProfileResponse,
} from "./types";

export function login(body: LoginRequest) {
  return apiFetch<LoginSuccessResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function logout() {
  return apiFetch<LogoutSuccessResponse>("/auth/logout", {
    method: "GET",
  });
}

export function getMyProfile() {
  return apiFetch<MyProfileResponse>("/auth/myProfile", {
    method: "GET",
  });
}
