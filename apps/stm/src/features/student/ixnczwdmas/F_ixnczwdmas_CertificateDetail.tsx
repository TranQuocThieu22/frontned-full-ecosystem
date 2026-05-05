"use client";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { ActionIcon, Divider, Paper, Title } from "@mantine/core";
import { IconDownload, IconPrinter, IconShare } from "@tabler/icons-react";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import dynamic from "next/dynamic";
import { useS_ixnczwdmas } from "./useS_ixnczwdmas";
const MyEditorCanvas = dynamic(() => import("@/components/EditorCanvas/MyEditorCanvas").then(mod => mod.MyEditorCanvas), {
    ssr: false, // Disable SSR
});

export default function F_ixnczwdmas_CertificateDetail() {
    const store = useS_ixnczwdmas()
    return (
        <Paper p={'md'} >
            <MyFlexRow justify={"space-between"}>
                <Title order={4}>{store.state.certificateName}</Title>
                <MyFlexRow>
                    <ActionIcon>
                        <IconShare />
                    </ActionIcon>
                    <ActionIcon color="green">
                        <IconDownload />
                    </ActionIcon>
                    <ActionIcon color="orange">
                        <IconPrinter />
                    </ActionIcon>
                </MyFlexRow>

            </MyFlexRow>
            <Divider />
            <MyEditorCanvas
                backgroundUrl="https://static.vecteezy.com/system/resources/previews/002/349/754/non_2x/modern-elegant-certificate-template-free-vector.jpg"
                texts={[
                    { text: store.state.fullName || '', x: 420, y: 400 },
                    { text: "", x: 200, y: 150 },
                    { text: utils_date_dateToDDMMYYYString(new Date(store.state.decisionDate!)) || "", x: 190, y: 550 },
                ]}
            />
        </Paper>
    )
}
