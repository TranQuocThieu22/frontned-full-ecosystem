import { BodyImportParticipate, service_event } from '@/api/services/service_event';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonImport } from '@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport';
import { FieldOption } from '@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal';
import { Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const config: FieldOption<BodyImportParticipate>[] = [
    {
        fieldKey: "studentCode",
        fieldName: "Mã sinh viên",
        isRequired: true
    },
    {
        fieldKey: "point",
        fieldName: "Điểm",
        isRequired: true,
        parseType: "number"
    },
]


export default function StudentAffairsImport({ eventId }: { eventId: number }) {
    const selectionDisc = useDisclosure();

    const handleSubmit = (isDelete: boolean) => {
        return (finalValues: BodyImportParticipate[]) => {
            return service_event.importParticipate({ eventId, isDelete }, finalValues) as any;
        };
    };

    return (
        <>
            <CustomButton
                actionType='import'
                onClick={selectionDisc[1].open}
            >
                Import
            </CustomButton>

            {/* Import Selection Modal */}
            <Modal
                opened={selectionDisc[0]}
                onClose={selectionDisc[1].close}
                title="Tùy chọn Import"
                centered
            >
                <Stack gap="md">
                    <Text size="sm" c="dimmed">
                        Chọn loại import bạn muốn thực hiện:
                    </Text>

                    {/* Import bổ sung (isDelete = false) */}
                    <CustomButtonImport
                        fields={config}
                        fileName="Ghi nhận điểm tham gia phòng công tác sinh viên"
                        buttonProps={{
                            children: "Import bổ sung dữ liệu",
                            variant: "outline",
                            fullWidth: true
                        }}
                        onSubmit={handleSubmit(false)}
                    />

                    {/* Import thay thế (isDelete = true) */}
                    <CustomButtonImport
                        fields={config}
                        fileName="Ghi nhận điểm tham gia phòng công tác sinh viên"
                        buttonProps={{
                            children: "Xóa tất cả và Import dữ liệu mới",
                            variant: "filled",
                            fullWidth: true
                        }}
                        onSubmit={handleSubmit(true)}
                    />
                </Stack>
            </Modal>
        </>
    )
}
