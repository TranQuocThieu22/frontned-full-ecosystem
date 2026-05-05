import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface Props {
    evidenceForm: UseFormReturnType<IEvidence, (values: IEvidence) => IEvidence>,
    readOnly?: boolean,
    isUpdateMode?: boolean,
    evidences?: IEvidence[];
}

export default function EvidenceGeneralInfoForm({ evidenceForm, readOnly, isUpdateMode, evidences = [] }: Props) {

    return <Stack gap="md">
        <CustomTextInput
            label="Mã minh chứng"
            withAsterisk
            {...evidenceForm.getInputProps("code")}
            readOnly={isUpdateMode || readOnly}
        />

        <CustomTextInput
            label="Tên minh chứng"
            {...evidenceForm.getInputProps("name")}
            withAsterisk
            readOnly={readOnly}
        />

        <CustomSelect
            defaultValue={String(evidenceForm.getValues().referenceEvidenceId ?? (((!isUpdateMode && !readOnly) && evidences[0]?.id)))}
            data={
                evidences.map((item) => ({
                    value: String(item.id ?? ""),
                    label: String(item.code ?? ""),
                })) ?? []
            }
            label="Trực thuộc minh chứng"
            placeholder="Nhập mã minh chứng cha"
            readOnly={readOnly}
            onChange={(val) =>
                evidenceForm.setFieldValue(
                    "referenceEvidenceId",
                    val !== "" ? Number(val) : undefined
                )
            }
        />

        <CustomTextArea
            label="Ghi chú"
            placeholder="Nhập ghi chú"
            rows={4}
            {...evidenceForm.getInputProps("note")}
            readOnly={readOnly}
        />
    </Stack>
}
