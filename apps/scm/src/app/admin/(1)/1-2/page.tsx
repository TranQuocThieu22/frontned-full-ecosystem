'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import { C0COLORS } from "@/constants/color";
import F1_2ReadUser from "@/modules-features/(1)/1-2/F1_2ReadUser";
import F1_2ViewMenuPermissions from "@/modules-features/(1)/1-2/F1_2ViewMenuPermissions";

import { Flex, Paper, ScrollArea } from "@mantine/core";

export default function Page() {
    return (
        <MyPageContent >
            <Flex align={"start"} gap={2}>
                <F1_2ReadUser />
                <ScrollArea.Autosize h={'75vh'} flex={1}>
                    <Paper p={'md'} bg={C0COLORS.mantineBackgroundSecondary}>
                        <F1_2ViewMenuPermissions />
                    </Paper>
                </ScrollArea.Autosize>
            </Flex>
        </MyPageContent>
    )
}
