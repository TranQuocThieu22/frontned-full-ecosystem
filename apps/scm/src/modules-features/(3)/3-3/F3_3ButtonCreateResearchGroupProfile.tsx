import pushToCreateResearchGroupProfileHook from "@/app/admin/(3)/3-3/hooks/pushToCreateResearchGroupProfileHook";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function F3_3ButtonCreateResearchGroupProfile(
) {
    const PushToCreatePage = pushToCreateResearchGroupProfileHook({});
    return (
        <>
            <Button
                color="green"
                onClick={PushToCreatePage}>
                <IconPlus />
                Tạo hồ sơ nhóm nghiêm cứu
            </Button>
        </>
    )
}