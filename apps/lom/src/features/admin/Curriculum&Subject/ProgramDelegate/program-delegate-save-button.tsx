
import { service_COEProgram } from "@/api/services/service_COEProgram";
import { COEProgram } from "@/interfaces/shared-interfaces/COEProgram";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { notifications } from "@mantine/notifications";

interface ProgramDelegateSaveButtonProps {
    loading?: boolean;
    processedData: COEProgram[];
    clearPendingChanges: () => void;
    pendingChanges: Record<string, Account | null>
};

export default function ProgramDelegateSaveButton({ loading, processedData, pendingChanges, clearPendingChanges }: ProgramDelegateSaveButtonProps) {

    const updateProgramMutation = useCustomReactMutation({
        axiosFn: (body: COEProgram[]) => service_COEProgram.updateList(body),
        mutationType: "update",
        options: {
            onSuccess: () => {
                clearPendingChanges();

                notifications.show({
                    title: 'Lưu thành công',
                    message: 'Dữ liệu đã được lưu thành công!',
                    color: 'green'
                });
            },
            onError: (error) => {
                console.error("Error saving menuData:", error);
                notifications.show({
                    title: 'Lưu thất bại',
                    message: 'Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại!',
                    color: 'red'
                });
            }
        }
    });

    const handleProgramSave = async () => {
        // Check if there are any pending changes
        if (Object.keys(pendingChanges).length === 0) {
            notifications.show({
                title: "Chưa có dữ liệu thay đổi",
                message: "Vui lòng kiểm tra lại dữ liệu",
                color: 'yellow'
            });
            return;
        }

        // Prepare menuData for API call
        const updatedData = Object.entries(pendingChanges).map(([COEProgramId, user]) => {
            const originalData = processedData.find(row => row.id === Number(COEProgramId));

            return ({
                ...originalData,
                userId: user?.id,
            })
        });

        // Execute updates
        updateProgramMutation.mutate(updatedData);
    };

    return (
        <CustomButton
            actionType="save"
            loading={loading}
            onClick={() => handleProgramSave()}
        />
    )
}
