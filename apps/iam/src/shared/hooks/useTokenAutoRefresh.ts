import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useEffect, useRef } from "react";

/**
 * Simple token refresh — calls POST /auth/refresh every 4 minutes after login.
 */
export function useTokenAutoRefresh() {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const store = useAuthenticateStore();

  useEffect(() => {
    const storeKey = "useAuthenticateStore";

    const refresh = () => {
      const stored = JSON.parse(localStorage.getItem(storeKey) ?? "{}");
      const accessToken: string = stored?.state?.state?.token ?? "";
      const refreshToken: string = stored?.state?.state?.refreshToken ?? "";

      if (!accessToken || !refreshToken) return;

      axiosInstance
        .post(
          "/auth/refresh",
          { refreshToken },
          { headers: { Authorization: "Bearer " + accessToken } }
        )
        .then((res) => {
          const newAccessToken: string = res.data?.results?.accessToken ?? "";
          const newRefreshToken: string = res.data?.results?.refreshToken ?? "";

          if (newAccessToken) {
            store.setProperty("token", newAccessToken);
            store.setProperty("refreshToken", newRefreshToken);

            const updated = JSON.parse(localStorage.getItem(storeKey) ?? "{}");
            updated.state.state.token = newAccessToken;
            updated.state.state.refreshToken = newRefreshToken;
            localStorage.setItem(storeKey, JSON.stringify(updated));
          }
        })
        .catch(() => {
          // Silent failure — 401 interceptor handles session expiry
        });
    };

    timerRef.current = setInterval(refresh, 4 * 60 * 1000); // 4 minutes

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
}
