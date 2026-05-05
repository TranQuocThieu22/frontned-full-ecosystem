import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useStore_Authenticate } from "aq-fe-framework/modules-features";
import { useRouter } from "next/navigation";

export default function F0Logout() {
    const router = useRouter()
    const S0Auth = useStore_Authenticate()
    return (
        <Button onClick={() => {
            S0Auth.setProperty("token", "")
            router.replace("/auth/login")

        }} leftSection={<IconLogout />} fullWidth justify="start" variant="subtle">
            Đăng xuất
        </Button>
    )
}
