import { service_EAQStandardSet } from "@/shared/APIs/service_EAQStandardSet";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { StandardSetTrainingProgram } from "@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet";
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

type updatePayload = Pick<StandardSetTrainingProgram, 'id' | 'eaqStandardSetId' | 'note'>
interface Props {
    values?: StandardSetTrainingProgram;
}
export default function StandardSetTrainingProgramCreateUpdateModal({ values }: Props) {

    const isUpdate = !!values;
    const disc = useDisclosure(false);
    const queryClient = useQueryClient()

    const TrainingProgramsQuery = useCustomReactQuery({
        queryKey: ["StandardSetTrainingProgramCreateUpdateModal", "TrainingPrograms", "GetAll"],
        axiosFn: () =>
            service_EAQTrainingProgram.getAll({
                cols: ["Department"],
            }),
        options: {
            enabled: disc[0]
        }
    })

    const standardSetQuery = useCustomReactQuery({
        queryKey: ["StandardSetTrainingProgramCreateUpdateModal", "StandardSet", "GetAll"],
        axiosFn: async () => service_EAQStandardSet.getAll(),
        options: {
            enabled: disc[0]
        }
    });
    useEffect(() => {
        if (!disc[0]) return; // Only run when modal is open

        if (values) {
            // Update mode - set form with existing values
            form.setValues(values);
        } else if (TrainingProgramsQuery.data?.length && standardSetQuery.data?.length) {
            // Create mode - set form with default values
            form.setValues({
                eaqTrainingProgramId: TrainingProgramsQuery.data[0]?.id ?? 0,
                eaqStandardSetId: standardSetQuery.data[0]?.id ?? 0,
                note: "",
            });
        }
    }, [disc[0], TrainingProgramsQuery.data, standardSetQuery.data, values]);
    const form = useForm<StandardSetTrainingProgram>({

        validate: {
            eaqTrainingProgramId: (value) => ((value ?? "") === "" ? "Chương trình đào tạo không được để trống" : null),
            eaqStandardSetId: (value) => ((value ?? "") === "" ? "Bộ tiêu chuẩn không được để trống" : null),
        }
    });

    const handleSubmit = useCallback(() => {
        const validationResult = form.validate();
        const formValue = form.getValues()
        if (validationResult.hasErrors) {
            return false;
        }
        if (isUpdate) {
            const payload: updatePayload = {
                id: formValue.id,
                eaqStandardSetId: formValue.eaqStandardSetId,
                note: formValue.note
                // eaqTrainingProgramId: formValue.eaqTrainingProgramId
            }
            return service_EAQTrainingProgram.updateAccreditationTrainingProgram(payload);
        };
        return service_EAQTrainingProgram.createAccreditationTrainingProgram(form.getValues());
    }, [TrainingProgramsQuery.data, standardSetQuery.data])

    useEffect(() => {
        if (isUpdate) return; // skip when editing

        if (TrainingProgramsQuery.data?.length && standardSetQuery.data?.length) {
            form.setValues({
                eaqTrainingProgramId: TrainingProgramsQuery.data[0]?.id ?? 0,
                eaqStandardSetId: standardSetQuery.data[0]?.id ?? 0,
                note: "",
            });
        }
    }, [TrainingProgramsQuery.data, standardSetQuery.data, values]);

    return (
        <CustomButtonCreateUpdate
            form={form}
            modalProps={{
                size: "40%",
                title: !values
                    ? "Tạo chương trình đào tạo kiểm định"
                    : "Chi tiết chương trình đào tạo kiểm định",
            }}
            isUpdate={isUpdate}
            onSubmit={handleSubmit}
            useCustomReactMutationProps={{
                options: {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['standardSetQuery'] });
                    }
                }
            }}
            disclosure={disc}
        >
            <CustomSelect
                withAsterisk
                readOnly={isUpdate}
                label="Chương trình đào tạo"
                data={TrainingProgramsQuery.data?.map((item) => ({
                    value: item.id!.toString(),
                    label: `${item.code} - ${item.name}`,
                })) ?? []}
                value={form.values.eaqTrainingProgramId?.toString() ?? null}
                onChange={(value) => {
                    if (value) {
                        return form.setFieldValue("eaqTrainingProgramId", parseInt(value));
                    }
                    return form.setFieldValue("eaqTrainingProgramId", undefined);
                }}
                error={form.errors.eaqTrainingProgramId}
            />

            <CustomSelect
                withAsterisk
                label="Bộ tiêu chuẩn kiểm định"
                data={standardSetQuery.data?.map((item) => ({
                    value: item.id!.toString(),
                    label: `${item.code} - ${item.name}`,
                })) ?? []}
                value={form.values.eaqStandardSetId?.toString() ?? null}
                onChange={(value) => {
                    if (value) {
                        form.setFieldValue("eaqStandardSetId", parseInt(value));
                    } else {
                        form.setFieldValue("eaqStandardSetId", undefined);
                    }
                }}
                error={form.errors.eaqStandardSetId}
            />

            <CustomTextArea
                label="Ghi chú"
                placeholder="Ghi chú"
                value={form.values.note ?? ""}
                onChange={(data) => form.setFieldValue("note", data.target.value)}
            />
        </CustomButtonCreateUpdate>
    );
}
