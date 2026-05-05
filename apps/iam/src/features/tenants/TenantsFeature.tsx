import { CustomLabelValueRow } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomLabelValueRow";
import { Stack } from "@mantine/core";
import TenantsTable from "./TenantsTable";

export default function TenantsFeature() {
    return (
        <Stack>
            <TenantsTable />
            <CustomLabelValueRow
                label="Lưu ý"
                value="Tenant không thể bị xóa nếu đã có dữ liệu để đảm bảo tính toàn vẹn."
            />
        </Stack>
    )
}
