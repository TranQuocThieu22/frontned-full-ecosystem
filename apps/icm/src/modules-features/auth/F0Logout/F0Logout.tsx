import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function F0Logout() {
    const router = useRouter()
    return (
        <Button onClick={() => { router.replace("/auth/login") }} leftSection={<IconLogout />} fullWidth justify="start" variant="subtle">
            Đăng xuất
        </Button>
    )
}
