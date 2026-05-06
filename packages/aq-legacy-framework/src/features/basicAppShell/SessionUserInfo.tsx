import { useAuthenticateStore } from "@aq-fe/aq-legacy-framework/features/authenticate/useAuthenticateStore";
import { CustomLabelValueRow } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomLabelValueRow";
import { colorsObject } from "@aq-fe/aq-legacy-framework/shared/const/object/colorsObject";
import { Card } from "@mantine/core";

export default function SessionUserInfo() {
    const authenticateStore = useAuthenticateStore();

    const fullName = authenticateStore.state.fullName || null;
    const code = authenticateStore.state.code || null;
    return (
        <Card bg={colorsObject.mantineBackgroundTealLight}>
            <CustomLabelValueRow size="sm" label={"Tài khoản"} value={code} />
            <CustomLabelValueRow size="sm" label={"Họ và tên"} value={fullName} />
        </Card>
    )
}
