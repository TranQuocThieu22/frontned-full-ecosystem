'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import F_thfkexfuki_Read_Prototype from "@/features/admin/thfkexfuki/Prototype/F_thfkexfuki_Read_Prototype";
import F_Shared_FilterStudent from "@/features/shared/FilterStudent/F_Shared_FilterStudent";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Group } from "@mantine/core";

//thfkexfuki
export default function Page_Prototype() {
    return (
        <CustomPageContent>
            <Group>
                <F_Shared_FilterStudent />
            </Group>
            <MyFlexColumn>
                <F_thfkexfuki_Read_Prototype />
            </MyFlexColumn>
        </CustomPageContent>
    )
}

