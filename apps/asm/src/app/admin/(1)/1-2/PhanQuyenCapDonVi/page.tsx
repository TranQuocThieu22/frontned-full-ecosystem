'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import { C0COLORS } from "@/constants/color";
import F1_2ManagePermission from "@/modules-features/(1)/1-2/F1_2ManagePermission";
import F1_2ViewMenuDonVi from "@/modules-features/(1)/1-2/F1_2ViewMenuDonVi";
import { Flex, Paper, ScrollArea } from "@mantine/core";

export default function PhaQuyenCapDonVi() {

    return (
        <MyPageContent >
            <Flex align={"start"} gap={2}>
                <F1_2ManagePermission />
                <ScrollArea.Autosize h={'75vh'} flex={1}>
                    <Paper p={'md'} bg={C0COLORS.mantineBackgroundSecondary}>
                        <F1_2ViewMenuDonVi />
                    </Paper>
                </ScrollArea.Autosize>
            </Flex>
        </MyPageContent>
    )
}
