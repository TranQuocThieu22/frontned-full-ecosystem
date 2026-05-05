import Shared_LecturerTable from "@/shared/features/Lecturer/Shared_LecturerTable";
import { SRMEvaluationMember } from "@/shared/interfaces/SRMEvaluationMember";
import { SRMLecturer } from "@/shared/interfaces/SRMLecturer";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IUseMapRefController } from "../hooks/useMapRef";
import { keyValueOf } from "../shared/CostReviewFunctions";

interface Props {
    handleAddEvaluationMember: Function;
    evaluationMembersData?: IUseMapRefController<string, SRMEvaluationMember>;
}

export default function MemberCreateModal({ handleAddEvaluationMember, evaluationMembersData }: Props) {
    const disc = useDisclosure();

    const handleConfirmSelect = (listUser: SRMLecturer[]) => {
        const { messageSuccess, messageError } = handleAddEvaluationMember(listUser);
        if (messageSuccess) {
            disc[1].close();
            notifications.show({
                autoClose: 10000,
                color: "green",
                title: "Thêm thành công",
                message: (messageSuccess),
            });
        }
        if (messageError) {
            disc[1].close();
            notifications.show({
                autoClose: 10000,
                color: "red",
                title: "Thêm thất bại",
                message: (messageError),
            });
        }
    }

    return (
        <CustomButtonModal
            modalProps={{ size: "70%", title: "Danh sách viên chức" }}
            buttonProps={{ children: "Thêm" }}
            disclosure={disc}
        >
            <Shared_LecturerTable
                enableRowSelection={(row) => {
                    if (evaluationMembersData) {
                        return !evaluationMembersData.get(keyValueOf(row.original.id));
                    }
                    return true;
                }}
                mantineSelectCheckboxProps={({ row }) => {
                    const isDisabled = evaluationMembersData
                        ? !!evaluationMembersData.get(keyValueOf(row.original.id))
                        : false;

                    return { disabled: isDisabled };
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
                    return (
                        <>
                            <CustomButton
                                actionType="create"
                                onClick={() => {
                                    handleConfirmSelect(selectedRows);
                                    table.resetRowSelection();
                                }}
                                disabled={selectedRows.length === 0}
                            >
                                Chọn
                            </CustomButton>
                        </>
                    );
                }}
                enableRowNumbers={false}
            />
        </CustomButtonModal>
    );
}
