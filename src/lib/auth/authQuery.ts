import { useMutation, useQuery } from "@tanstack/react-query";

import { getMyProfile, login, logout } from "./authApi";
import type { LoginRequest } from "./types";

export const authQueryKeys = {
  myProfile: ["auth", "myProfile"] as const,
};

export function useLoginMutation() {
  return useMutation({
    mutationFn: (body: LoginRequest) => login(body),
  });
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: () => logout(),
  });
}

export function useMyProfileQuery(enabled = true) {
  return useQuery({
    queryKey: authQueryKeys.myProfile,
    queryFn: getMyProfile,
    enabled,
    retry: false,
  });
}
