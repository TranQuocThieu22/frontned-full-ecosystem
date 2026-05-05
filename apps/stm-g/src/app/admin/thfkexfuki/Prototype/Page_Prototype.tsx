'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_thfkexfuki_Read_Prototype from "@/modules-features/admin/thfkexfuki/Prototype/F_thfkexfuki_Read_Prototype";
import F_Shared_FilterStudent from "@/modules-features/shared/FilterStudent/F_Shared_FilterStudent";
import { Group } from "@mantine/core";

//thfkexfuki
export default function Page_Prototype() {
    return (
        <MyPageContent>
            <Group>
                <F_Shared_FilterStudent />
            </Group>
            <MyFlexColumn>
                <F_thfkexfuki_Read_Prototype />
            </MyFlexColumn>
        </MyPageContent>
    )
}

