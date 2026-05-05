import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { accountService } from "../../shared/APIs/accountService";
import { usePermissionStore } from "../../shared/stores/usePermissionStore";
import { useAuthenticateStore } from "./useAuthenticateStore";

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
);

interface GoogleLoginButtonProps {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    redirectUrlAfterLogin?: string;
}

export const GoogleLoginButton = ({ onSuccess, onError, redirectUrlAfterLogin = "/" }: GoogleLoginButtonProps) => {
    const router = useRouter();
    const authenticateStore = useAuthenticateStore();
    const permissionStore = usePermissionStore();

    const googleLoginMutation = useMutation({
        mutationFn: async (token: string) => {
            const result = await accountService.googleLogin(token);
            return result.data;
        },
        onSuccess: (data) => {
            if (data.isSuccess == 0) {
                notifications.show({
                    message: data.message || "Đăng nhập Google thất bại",
                    color: "red"
                });
                return;
            }

            // Lưu thông tin vào store
            authenticateStore.setProperty("code", data.data?.userName);
            authenticateStore.setProperty("fullName", data.data?.userFullName);
            authenticateStore.setProperty("userId", data.data?.userId);
            authenticateStore.setProperty("token", data.data?.token);
            authenticateStore.setProperty("roleIds", data.data?.roleIds);
            authenticateStore.setProperty("workingUnitId", data.data?.workingUnitId);

            permissionStore.setProperty("permission", data.data?.permissions);

            if (onSuccess) {
                onSuccess(data);
                return;
            }
            router.replace(redirectUrlAfterLogin);
        },
        onError: (error) => {
            notifications.show({
                message: "Có lỗi xảy ra khi kết nối máy chủ đăng nhập",
                color: "red"
            });
            if (onError) onError(error);
        }
    });

    const login = useGoogleLogin({
        onSuccess: (res) => {
            googleLoginMutation.mutate(res.access_token);
        },
        onError: (error) => {
            notifications.show({
                message: "Đăng nhập Google bị hủy hoặc lỗi",
                color: "red"
            });
            if (onError) onError(error);
        },
    });

    return (
        <Button
            loading={googleLoginMutation.isPending}
            variant="default"
            fullWidth
            onClick={() => login()}
            leftSection={<GoogleIcon />}
            styles={{
                inner: { justifyContent: 'center' },
                label: { fontWeight: 600 }
            }}
        >
            Đăng nhập bằng tài khoản Google
        </Button>
    );
};
