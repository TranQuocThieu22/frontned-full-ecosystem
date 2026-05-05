import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation.js";
import { useAuthenticateStore } from "./useAuthenticateStore";

interface I {
    redirectURL?: string
}

export function AuthenticateLogout({ redirectURL = "/auth/login" }: I) {
    const router = useRouter()
    const authenticateStore = useAuthenticateStore()
    const permissionStore = usePermissionStore()
    return (
        <Button onClick={() => {
            authenticateStore.setState({})
            permissionStore.setState({})
            router.replace(redirectURL)

        }} leftSection={<IconLogout />} fullWidth justify="start" variant="subtle">
            Đăng xuất
        </Button>
    )
}
