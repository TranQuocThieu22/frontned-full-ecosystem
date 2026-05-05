import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useDisclosure } from "@mantine/hooks";

export default function F_CourseRegistration_ViewUpdate_Delete({ id, code }: { id: number, code: string }) {
    const disc = useDisclosure()
    return (
        <CustomActionIconDelete
            contextData={'đăng ký môn học'}
            onSubmit={() => baseAxios.post("/COECourseSectionStudent/Delete", { id: id })}
        />
    )
}
