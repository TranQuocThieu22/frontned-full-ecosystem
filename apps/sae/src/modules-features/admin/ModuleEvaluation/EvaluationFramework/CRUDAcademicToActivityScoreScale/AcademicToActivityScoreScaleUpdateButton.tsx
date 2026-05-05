import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IAcademicToActivityScoreScale } from "./Interfaces/IAcademicToActivityScoreScale";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { useDisclosure } from "@mantine/hooks";

export default function AcademicToActivityScoreScaleUpdateButton({ data }: { data: IAcademicToActivityScoreScale }) {
    const disc = useDisclosure()
    const form = useForm<IAcademicToActivityScoreScale>({
        initialValues: data,
        validate: {
            nguongDiemHocTapLonHonBang: (value) => value != null ? null : "Ngưỡng điểm học tập không được để trống",
            diemRenLuyenQuyDoi: (value) => value != null ? null : "Điểm rèn luyện quy đổi không được để trống",
        }
    });

    return (
        <Group>
            <CustomButtonModal
                isActionIcon
                modalProps={{
                    title: "Thang đo điểm học tập và quy đổi điểm rèn luyện"
                }}
                disclosure={disc}
            //todo coi lại trang này
            // form={form}
            >
                <CustomNumberInput min={0} label="Ngưỡng điểm học tập >= " {...form.getInputProps("nguongDiemHocTapLonHonBang")} />
                <CustomNumberInput min={0} label="Điểm rèn luyện quy đổi" {...form.getInputProps("diemRenLuyenQuyDoi")} />
            </CustomButtonModal>
        </Group >
    );
}
