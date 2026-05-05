'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F7_1Tab1Create from "@/modules-features/(7)/7-1/Tab1/F7_1Tab1Create";
import F7_1Tab1Read from "@/modules-features/(7)/7-1/Tab1/F7_1Tab1Read";
import F7_1Tab2Create from "@/modules-features/(7)/7-1/Tab2/F7_1Tab2Create";
import F7_1Tab2Read from "@/modules-features/(7)/7-1/Tab2/F7_1Tab2Read";
import { Space, Tabs } from "@mantine/core";
import { IconStretching2, IconUserStar } from "@tabler/icons-react";

export default function Page() {
    return (
        <MyPageContent>
            <Tabs defaultValue="sinh-vien">
                <Tabs.List>
                    <Tabs.Tab value="sinh-vien" leftSection={<IconUserStar />}>
                        Sinh viên
                    </Tabs.Tab>
                    <Tabs.Tab value="hoc-vien-tu-do" leftSection={<IconStretching2 />}>
                        Học viên tự do
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="sinh-vien" pt={'md'}>
                    <F7_1Tab1Create />
                    <Space my={'md'} />
                    <F7_1Tab1Read />
                </Tabs.Panel>
                <Tabs.Panel value="hoc-vien-tu-do" pt={'md'}>
                    <F7_1Tab2Create />
                    <Space my={'md'} />
                    <F7_1Tab2Read />
                </Tabs.Panel>

            </Tabs>
        </MyPageContent>
    )
}
