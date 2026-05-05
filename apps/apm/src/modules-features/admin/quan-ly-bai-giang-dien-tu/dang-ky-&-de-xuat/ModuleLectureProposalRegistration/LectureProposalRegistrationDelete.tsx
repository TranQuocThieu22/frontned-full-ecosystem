import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { MyActionIconModal } from "@/components/ActionIcons/ActionIconModal/MyActionIconModal";
import { useDisclosure } from "@mantine/hooks";
import { MyButton } from "aq-fe-framework/components";

export default function LectureProposalRegistrationDelete({ id, code, isTied }: { id: number, code: string, isTied: boolean }) {
    const disc = useDisclosure();

    if (isTied) {
        return (
            <MyActionIconModal disclosure={disc} crudType="delete" title="Không được xóa dữ liệu">
                {`Dữ liệu này đã được sử dụng, bạn vui lòng xử lý dữ liệu liên quan trước và sau đó thực hiện xóa lại!`}
                <MyButton
                    onClick={() => {
                        disc[1].close()
                    }}
                >
                    Đồng ý
                </MyButton>
            </MyActionIconModal>
        )
    }

    return (
        <MyActionIconDelete
            contextData={code}
            onSubmit={() => { }}
        />
    );
}