import { Button } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { useEffect } from "react";

export default function F3_1ButtonActivateAccount(
    { data }: { data: any[] }
) {

    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <>
            <Button
                disabled={data.length === 0}
                leftSection={<IconLock />}
                color="indigo"
                onClick={() => alert("Kích hoạt tài khoản thành công")}
            >
                Đổi trạng thái tài khoản
            </Button>
        </>
    )
}