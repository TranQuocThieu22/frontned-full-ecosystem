import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { useDisclosure } from "@mantine/hooks";
import LecturerProfileMainTabs from "./LecturerProfileMainTabs";

export default function LecturerProfileButtonUpdateScientificProfile(
    { scientificProfileId }: { scientificProfileId: number }
) {
    const disc = useDisclosure()
    return (
        <>
            <CustomButtonModal
                disclosure={disc}
                isActionIcon
                modalProps={{
                    size: "100em",
                    title: "Hồ sơ năng lực Giảng viên – Chuyên viên"
                }}
                actionIconProps={{ actionType: "update" }}
            >
                <LecturerProfileMainTabs />
            </CustomButtonModal>
        </>
    )
}
