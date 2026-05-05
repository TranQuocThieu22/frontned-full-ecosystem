import { MyLabelValueRow } from "@/core";
import { useStore_Authenticate } from "@/modules-features/authenticate/useStore_Authenticate";
import { colorsObject } from "@/shared/consts/colorsObject";
import { Card } from "@mantine/core";

export default function SessionUserInfo() {
    const authenticateStore = useStore_Authenticate();

    const fullName = authenticateStore.state.fullName || null;
    const code = authenticateStore.state.code || null;
    return (
        <Card bg={colorsObject.mantineBackgroundTealLight}>
            <MyLabelValueRow size="sm" label={"Tài khoản"} value={code} />
            <MyLabelValueRow size="sm" label={"Họ và tên"} value={fullName} />
        </Card>
    )
}
