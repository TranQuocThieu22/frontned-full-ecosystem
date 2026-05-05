import { Button } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import useS_TestRoom from "../useS_TestRoom";

export default function F_testRoom_SubmitTest() {
    const store = useS_TestRoom()
    return (
        <Button
            radius="lg"
            size="md"
            leftSection={<IconSend size={18} />}
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            variant="gradient"
            fw={600}
            px={24}
            onClick={() => store.setProperty("status", "complete")}
        >
            Nộp bài
        </Button>
    );
}