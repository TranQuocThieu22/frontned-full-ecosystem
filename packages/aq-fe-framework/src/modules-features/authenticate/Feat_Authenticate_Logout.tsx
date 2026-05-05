import { useStore_Permission } from "@/stores";
import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation.js";
import { useStore_Authenticate } from "./useStore_Authenticate";

interface I {
    redirectURL?: string
}

export function Feat_Authenticate_Logout({ redirectURL = "/auth/login" }: I) {
    const router = useRouter()
    const authenticateStore = useStore_Authenticate()
    const permissionStore = useStore_Permission()
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
