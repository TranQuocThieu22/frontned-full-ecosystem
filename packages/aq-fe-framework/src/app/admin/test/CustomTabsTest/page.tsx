"use client"
import { MyDataTable, MyTextInput } from "@/components";
import { MyButton } from "@/core";
import { CustomTabs } from "@/core/navigation/CustomTabs/CustomTabs";
import { Stack } from "@mantine/core";
import { IconClock, IconList, IconUser } from "@tabler/icons-react";

export default function Page() {
    return (
        <CustomTabs
            defaultValue={"Tab 1"}
            tabs={[
                {
                    label: "Thông tin chung",
                    leftSection: <IconClock />,
                    children: <Stack>
                        <MyTextInput label="Mã dự án" />
                        <MyTextInput label="Tên dự án" />
                    </Stack>,
                },
                {
                    label: "Danh sách thành viên",
                    leftSection: <IconUser />,
                    children: <MyDataTable data={[]} columns={[]} />,
                },
                {
                    label: "Danh sách đề xuất",
                    children: <MyButton actionType="update" />,
                    leftSection: <IconList />
                }
            ]}
        />
    )
}
