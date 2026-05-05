"use client"
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { programService, ProgramScoreConfigBody } from "@/shared/APIs/programService";
import { Program } from "@/shared/interfaces/program";
import { ScoreConfig } from "@/shared/interfaces/scoreConfig";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useEffect } from "react";

type FormValues = Pick<ScoreConfig, "code" | "name" | "percentScore" | "scoreMax" | "scoreMin">;

interface Props {
    /** Khi có = sửa; khi không có = thêm mới */
    data?: ScoreConfig;
    programId: number;
    programData: Program;
}

export default function ScoreConfigProgressScoreCreateUpdate({ data, programId, programData }: Props) {
    const isUpdate = !!data;
    const disc = useDisclosure();

    const form = useForm<FormValues>({
        mode: "uncontrolled",
        validate: {
            code: (value) => value ? null : "Không được để trống",
            name: (value) => value ? null : "Không được để trống",
            percentScore: (value) => value != null ? null : "Không được để trống",
            scoreMax: (value) => value != null ? null : "Không được để trống",
            scoreMin: (value) => value != null ? null : "Không được để trống",
        },
    });

    useEffect(() => {
        if (!data) return;
        const values = {
            code: data.code ?? "",
            name: data.name ?? "",
            percentScore: data.percentScore ?? 0,
            scoreMax: data.scoreMax,
            scoreMin: data.scoreMin,
        };
        form.setInitialValues(values);
        form.setValues(values);
    }, [data]);

    const buildBody = (values: FormValues): ProgramScoreConfigBody => ({
        programId: isUpdate ? (data!.programId ?? 0) : programId,
        scoreSystem: programData.scoreSystem ?? 0,
        scoreFormula: programData.scoreFormula ?? 0,
        scorePass: programData.scorePass ?? 0,
        testScoreSystem: programData.testScoreSystem ?? null,
        testScoreFormula: programData.testScoreFormula ?? null,
        testScorePass: programData.testScorePass ?? null,
        scoreConfigs: [{
            id: isUpdate ? data!.id : 0,
            code: values.code,
            name: values.name,
            concurrencyStamp: "lam",
            isEnabled: true,
            programId: isUpdate ? data!.programId : programId,
            scoreType: 1,
            percentScore: values.percentScore,
            scoreMax: values.scoreMax,
            scoreMin: values.scoreMin,
        }],
    });

    const mutation = useCustomReactMutation({
        axiosFn: programService.saveProgramScoreConfig,
        mutationType: isUpdate ? "update" : "create",
        successNotification: isUpdate ? "Sửa thành công" : "Thêm thành công",
        options: {
            onSuccess: () => disc[1].close(),
        },
    });

    return (
        <CustomButtonModal
            disclosure={disc}
            isActionIcon={isUpdate}
            actionIconProps={{ actionType: "update", color: "yellow", type: "button" }}
            buttonProps={{ actionType: "create", type: "button" }}
            modalProps={{ title: isUpdate ? "Sửa điểm thành phần" : "Thêm điểm thành phần" }}
        >
            <CustomFlexColumn>
                <CustomTextInput label="Mã thành phần" {...form.getInputProps("code")} readOnly={isUpdate} />
                <CustomTextInput label="Tên thành phần" {...form.getInputProps("name")} />
                <CustomNumberInput label="Trọng số" {...form.getInputProps("percentScore")} />
                <CustomNumberInput label="Điểm max" {...form.getInputProps("scoreMax")} />
                <CustomNumberInput label="Ngưỡng liệt" {...form.getInputProps("scoreMin")} />
            </CustomFlexColumn>
            <CustomButton
                actionType="save"
                loading={mutation.isPending}
                onClick={() => {
                    const result = form.validate();
                    if (result.hasErrors) return;
                    mutation.mutate(buildBody(form.getValues()));
                }}
            />
        </CustomButtonModal>
    );
}
