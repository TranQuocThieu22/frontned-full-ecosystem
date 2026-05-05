import { Group, MantineStyleProp, Mark, Text } from "@mantine/core";
import { utils_currency_formatWithSuffix } from "aq-fe-framework/utils";
import { useS_thfkexfuki } from "./useS_thfkexfuki";
export default function F_thfkexfuki_TitleInformation() {
    const store = useS_thfkexfuki()
    const styleCount: MantineStyleProp = {
        fontWeight: 700,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: "4px"
    }
    return (
        <Group gap={3}>
            <Text
                size="17px"
            >
                Đã học
                <Mark
                    color="green.9"
                    style={styleCount}
                >
                    {store.state.studentDashboard?.course?.totalCount?.toString() || "0"}
                </Mark>
                khóa
            </Text>,
            <Text
                size="17px"
            >
                Hoàn thành
                <Mark
                    color="green.9"
                    style={styleCount}
                >
                    {utils_currency_formatWithSuffix((store.state.studentDashboard?.payments || [])
                        .reduce((sum, p) => sum + (p.paymentAmount || 0), 0), ' VNĐ')}
                </Mark>
                học phí, lệ phí, đạt được
            </Text>
            <Text
                size="17px"
            >
                <Mark
                    color="green.9"
                    style={styleCount}
                >
                    {store.state.studentDashboard?.certificate?.totalCount?.toString() || "0"}
                </Mark>
                chứng chỉ, chứng nhận
            </Text>
        </Group>
    )
}
