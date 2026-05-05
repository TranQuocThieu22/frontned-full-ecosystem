import { Group } from '@mantine/core';
import { useForm } from "@mantine/form";
import { IAcademicToActivityScoreScale } from "./Interfaces/IAcademicToActivityScoreScale";
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';

export default function AcademicToActivityScoreScaleCreateButton() {
    const form = useForm<IAcademicToActivityScoreScale>({
        validate: {
            nguongDiemHocTapLonHonBang: (value) => value != null ? null : "Ngưỡng điểm học tập không được để trống",
            diemRenLuyenQuyDoi: (value) => value != null ? null : "Điểm rèn luyện quy đổi không được để trống",
        }
    });

    return (
        <Group>
            <CustomButtonCreateUpdate
                modalProps={{
                    title: "Thang đo điểm học tập và quy đổi điểm rèn luyện"

                }}
                onSubmit={(form) => { }}
                form={form}
            >
                <CustomNumberInput min={0} label="Ngưỡng điểm học tập >= " {...form.getInputProps("nguongDiemHocTapLonHonBang")} />
                <CustomNumberInput min={0} label="Điểm rèn luyện quy đổi" {...form.getInputProps("diemRenLuyenQuyDoi")} />
            </CustomButtonCreateUpdate>
        </Group >
    );
}
