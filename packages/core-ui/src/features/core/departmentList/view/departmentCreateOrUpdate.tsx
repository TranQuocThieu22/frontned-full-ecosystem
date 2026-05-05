import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea';
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput';
import { Department } from '@aq-fe/core-ui/shared/interfaces/Department';
import { CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import { Checkbox, Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { AxiosResponse } from 'axios';

const type: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};

interface IProps {
    mode: 'create' | 'update';
    form: UseFormReturnType<Department>;
    unitSelectData: { value: string; label: string; }[];
    onUnitSelectChange: (value: string | null) => void;
    onUnitTypeChange: (value: string | null) => void;
    onSubmit: () => Promise<AxiosResponse<CustomApiResponse<Department>>>;
}

export default function DepartmentCreateOrUpdate({
    mode,
    form,
    unitSelectData,
    onUnitSelectChange,
    onUnitTypeChange,
    onSubmit
}: IProps) {
    const isCreateMode = mode === 'create';
    const isUpdateMode = mode === 'update';

    const getDepartmentTypeData = () => {
        return Object.entries(type).map(([key, label]) => ({
            value: key,
            label,
        }));
    }

    return (
        <CustomButtonCreateUpdate
            isUpdate={!isCreateMode}
            modalProps={{
                size: "80%",
                title: !isCreateMode
                    ? "Cập nhật thông tin đơn vị"
                    : "Tạo thông tin đơn vị"
            }}
            form={form}
            onSubmit={onSubmit}
        >
            <CustomTextInput
                withAsterisk
                disabled={isUpdateMode}
                label="Mã đơn vị"
                placeholder='Điền mã đơn vị'
                {...form.getInputProps("code")}
            />
            <CustomTextInput
                withAsterisk
                label="Tên đơn vị"
                placeholder='Điền tên đơn vị'
                {...form.getInputProps("name")}
            />
            <CustomSelect
                data={getDepartmentTypeData()}
                label="Loại đơn vị"
                placeholder='Chọn loại đơn vị'
                value={form.values.type?.toString() ?? ""}
                onChange={onUnitTypeChange}
                error={form.errors.type}
            />
            <CustomSelect
                clearable
                data={unitSelectData}
                label="Trực thuộc"
                value={form.values.unitId?.toString() ?? ""}
                onChange={onUnitSelectChange}
                error={form.errors.unitId}
            />
            <CustomTextArea
                label="Ghi chú"
                placeholder='Ghi chú'
                {...form.getInputProps("note")}
            />
            <Checkbox
                label="Đơn vị ngoài trường"
                defaultChecked={!form.values.isWorkingUnit} // Add this line
                onChange={(event) => {
                    form.setFieldValue('isWorkingUnit', !event.currentTarget.checked);
                }}
            />
        </CustomButtonCreateUpdate>
    );
}
