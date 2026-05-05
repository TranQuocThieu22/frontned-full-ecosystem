import { publicationDeclarationService } from "@/shared/APIs/publicationDeclarationService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMDeclarationMember } from "@/shared/interfaces/SRMDeclarationMember";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { notifications } from "@mantine/notifications";
import { IconCalculator } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    isLoading: boolean;
    values: SRMDeclarationMember[];
    resetRowSelection: () => void
}

export default function PublishTimeCalculateButton({
    values,
    isLoading,
    resetRowSelection
}: Props) {
    const academicYearStore = useAcademicYearStore();
    const queryClient = useQueryClient();

    const publicationDeclarationCalculateMutate = useCustomReactMutation({
        axiosFn(declarationMembers: SRMDeclarationMember[]) {
            return publicationDeclarationService.scientificPublicationEvaluation({
                academicYearId: academicYearStore?.state?.academicYear?.id ?? -1,
                srmDeclarationMembers: declarationMembers.map(item => {
                    return {
                        id: item.id,
                        isEnabled: item.isEnabled
                    }
                })
            })
        },
        enableDefaultSuccess: false,
        options: {
            onSuccess: () => {
                notifications.show({
                    itemType: 'success',
                    color: 'green',
                    message: values.length == 0
                        ? <>Tính điểm tất cả dữ liệu thành công</>
                        : <>Tính điểm <b>{values.length}</b> dữ liệu thành công</>,
                })

                resetRowSelection();

                queryClient.invalidateQueries({ queryKey: ['PublicationTimeLockCalculateList', academicYearStore?.state?.academicYear?.id] })
            }
        }
    })

    return (
        <CustomButton
            loading={isLoading}
            leftSection={<IconCalculator size={18} />}
            color="green"
            onClick={() => publicationDeclarationCalculateMutate.mutate(values)}
        >
            Tính
        </CustomButton>
    )
}