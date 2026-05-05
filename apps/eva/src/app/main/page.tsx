"use client"
import { Button, Group, Stack, Title } from "@mantine/core";
import { IconLogin, IconSchool } from "@tabler/icons-react";
import { Feat_Authenticate_Login } from "aq-fe-framework/modules-features";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()
    return (
        <Feat_Authenticate_Login
            showLoginButton={false}
            backgroundImage="/imgs/student-exam-test.jpg"
            header={
                <Stack align="center" gap={4}>
                    <IconSchool style={{ width: 40, height: 40 }} />
                    <Title order={1} size="h2" fw={700} c="teal.7">
                        Trường đại học Anh Quân
                    </Title>
                    <Title order={2} fw={500} c="gray.7">
                        Đăng nhập
                    </Title>
                </Stack>
            }
            showSaveLogin={false}
            showForgotPassword={false}
            additionalActions={(
                <Group>
                    <Button
                        //todo
                        onClick={() => router.replace("main/selectTestRoom")}
                        fullWidth
                        color="teal.7"
                        leftSection={<IconLogin />}>
                        Đăng nhập
                    </Button>
                </Group>
            )}
        />
    )
}
