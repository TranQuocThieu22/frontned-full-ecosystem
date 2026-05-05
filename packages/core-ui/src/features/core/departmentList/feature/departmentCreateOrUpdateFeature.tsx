import { departmentService } from '@aq-fe/core-ui/shared/APIs/departmentService';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { Department } from '@aq-fe/core-ui/shared/interfaces/Department';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import DepartmentCreateOrUpdate from '../view/departmentCreateOrUpdate';

const getDefaultInitialValues = (): Department => ({
    id: 0,
    code: "",
    name: "",
    concurrencyStamp: "",
    isEnabled: true,
    type: 1,
    unitId: null,
    note: "",
    unit: null,
    isWorkingUnit: false
});
interface IProps {
    mode: 'create' | 'update';
    data?: Department;
}

export function DepartmentCreateOrUpdateFeature({ mode, data }: IProps) {
    const [fileData, setFileData] = useState<any[]>([]);
    const isCreateMode = mode === 'create';
    const isUpdateMode = mode === 'update';

    const form = useForm<Department>({
        initialValues: isCreateMode ? getDefaultInitialValues() : ({ ...data, note: '' }),
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            ...(isCreateMode && {
                type: (value) => (value !== null && value !== undefined) ? null : 'Không được để trống',
            }),
        }
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const { data: units, isLoading, isError } = useCustomReactQuery({
        queryKey: ["UnitRead"],
        axiosFn: () => departmentService.getAll(),
        options: {
            refetchOnWindowFocus: false,
        }
    });

    useEffect(() => {
        if (isCreateMode) {
            form_multiple.setValues({ importedData: fileData });
        }
    }, [fileData, isCreateMode]);

    useEffect(() => {
        if (isUpdateMode && data) {
            // Convert null boolean values to actual booleans
            const sanitizedData = {
                ...data,
                isWorkingUnit: data.isWorkingUnit ?? true, // Convert null to false
                note: data.note ?? ''
            };
            form.setValues(sanitizedData);
        }
    }, [data, isUpdateMode]);

    const getUnitSelectData = () => {
        if (isLoading) {
            return [{ value: "", label: "Đang tải..." }];
        }
        if (isError) {
            return [{ value: "", label: "Lỗi tải dữ liệu" }];
        }

        const filteredUnits = isUpdateMode
            ? units?.filter(unit => unit.id !== form.values.id)
            : units;

        return filteredUnits?.map((unit) => ({
            value: unit.id?.toString() || "",
            label: `${unit.code} - ${unit.name?.trim()}` || "Không có tên",
        })) || [];
    };

    const handleUnitSelectChange = (value: string | null) => {
        const selectedId = value ? parseInt(value, 10) : null;

        if (isUpdateMode) {
            const selectedUnit = units?.find(unit => unit.id === selectedId) || null;
            form.setFieldValue("unitId", selectedId);
            form.setFieldValue("unit", selectedUnit);
        } else {
            form.setFieldValue("unitId", selectedId);
        }
    };

    const handleUnitTypeChange = (value: string | null) => {
        form.setFieldValue("type", value ? parseInt(value) : null);
    };

    const handleSubmit = async () => {
        if (isCreateMode) {
            return await departmentService.create({
                ...form.values,
                isWorkingUnit: form.values.isWorkingUnit
            });
        } else {
            return await departmentService.update({
                ...form.values,
                isWorkingUnit: form.values.isWorkingUnit
            });
        }
    };

    return (
        <DepartmentCreateOrUpdate
            mode={mode}
            form={form}
            unitSelectData={getUnitSelectData()}
            onUnitSelectChange={handleUnitSelectChange}
            onUnitTypeChange={handleUnitTypeChange}
            onSubmit={handleSubmit}
        />
    );
}
