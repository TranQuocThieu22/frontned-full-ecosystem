'use client'
import { evaluationDetailService } from "@/shared/APIs/evaluationDetailService";
import { evaluationService } from "@/shared/APIs/evaluationService";
import { IRubrics, rubricService } from "@/shared/APIs/rubricService";
import { subjectService } from "@/shared/APIs/subjectService";
import { Button, Grid, Group, Skeleton } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal, MySelect, MyTextInput } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
// 1. Import useState and useEffect
import { useQueryClient } from "@tanstack/react-query";
import { utils_notification_show } from "aq-fe-framework/utils";
import { useEffect, useState } from "react";
import RubricsDetailTableCreate from "../ModuleRubric/RubricCatalog/RubricsDetail/RubricsDetailTableCreate";
import useS_Rubrics from "../ModuleRubric/RubricCatalog/useS_Rubrics";

export default function RubricsCreate({ buttonLabel = 'Thêm' }: { buttonLabel?: string }) {
    const queryClient = useQueryClient()
    const disc = useDisclosure()
    const store = useS_Rubrics()
    let totalDensityFlag = true

    const form = useForm<IRubrics>({
        mode: 'uncontrolled',
        initialValues: {
            id: 0,
            code: "",
            name: "",
            note: "",
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    })

    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
    const [selectedEvaluationId, setSelectedEvaluationId] = useState<number | null>(null);

    const subjectQuery = useMyReactQuery({
        queryKey: ['subjectQueryCreate', 0],
        axiosFn: async () => subjectService.getAll(),
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false
        }
    })
    const evaluationQuery = useMyReactQuery({
        queryKey: ['evaluationQueryCreate', 0],
        axiosFn: async () => evaluationService.getAll(),
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false
        }
    })

    const evaluationDetailQuery = useMyReactQuery({
        queryKey: ['evaluationDetailQueryCreate', selectedEvaluationId], // Key changes when ID changes
        axiosFn: async () => evaluationDetailService.GetEvaluationDetailsByEvaluationId({ param: `evaluationId=${selectedEvaluationId}` }),
        options: {
            enabled: disc[0] && selectedEvaluationId !== null,
            refetchOnWindowFocus: false
        }
    })

    useEffect(() => {
        if (subjectQuery.data && subjectQuery.data.length > 0) {
            const initialId = Number(subjectQuery.data[0]?.id);
            setSelectedSubjectId(initialId);
            store.setProperty("rubrics", { ...store.state.rubrics, evaSubjectId: initialId });
        }
    }, [subjectQuery.data]);

    useEffect(() => {
        if (evaluationQuery.data && evaluationQuery.data.length > 0) {
            const initialId = Number(evaluationQuery.data[0]?.id);
            setSelectedEvaluationId(initialId);
            store.setProperty("rubrics", { ...store.state.rubrics, evaEvaluationId: initialId });
        }
    }, [evaluationQuery.data]);

    const selectedSubjectName = subjectQuery.data?.find(
        (subject) => subject.id === selectedSubjectId
    )?.name || "";
    const handleSubmit = () => {

        const mainFormValues = form.getValues();

        // --- 1. GET THE DATA FROM THE STORE ---
        // The parent rows now already contain the properly nested evaRubricsCriteriaDetails
        const parentCriterias = store.state.editedRubrics ?? [];
        console.log("🚀 ~ handleSubmit ~ store.state.editedRubrics:", store.state.editedRubrics)

        console.log('====================================');
        console.log(parentCriterias);
        console.log('====================================');
        // --- 2. CLEAN AND PREPARE THE DATA ---
        // Since evaRubricsCriteriaDetails are already nested, we just need to clean up the parent objects
        const combinedAndCleanedCriterias = parentCriterias.map((parent: any) => {
            // **IMPORTANT**: Build a NEW object with ONLY the keys the API expects
            const cleanedParent = {
                id: 0,
                code: parent.code,
                name: parent.name,
                concurrencyStamp: parent.concurrencyStamp || "",
                isEnabled: parent.isEnabled ?? true,
                density: parent.density,
                description: parent.description || "",
                evaRubricsId: undefined,
                evaEvaluationId: store.state.rubrics?.evaEvaluationId,
                evaRubricsCriteriaDetails: parent.evaRubricsCriteriaDetails || []
            };

            return cleanedParent;
        });

        // --- 3. ASSEMBLE THE FINAL PAYLOAD ---
        const finalPayload: IRubrics = {
            // id: null,
            code: mainFormValues.code,
            name: mainFormValues.name,
            note: mainFormValues.note,
            concurrencyStamp: "",
            isEnabled: true,
            evaSubjectId: selectedSubjectId || 0,
            evaEvaluationId: selectedEvaluationId || 0,

            // Use the cleaned criterias with properly nested details
            evaRubricsCriterias: combinedAndCleanedCriterias,
        };
        const totalDensity = combinedAndCleanedCriterias.reduce((sum, crit) => sum + (crit.density || 0), 0);

        if (totalDensity < 100 || totalDensity > 100) totalDensityFlag = false

        if (!totalDensityFlag) {
            if (totalDensity > 100) {
                utils_notification_show({
                    crudType: "error",
                    message: "Tổng mật độ tiêu chí vượt quá 100%. Vui lòng kiểm tra lại.",
                    color: "red"
                });
                return
            }
            if (totalDensity < 100) {
                utils_notification_show({
                    crudType: "error",
                    message: "Tổng mật độ tiêu chí phải bằng 100%. Vui lòng kiểm tra lại.",
                    color: "red"
                });
                return
            }
        }
        console.log(finalPayload);
        return rubricService.create(finalPayload)
            .then(() => {
                queryClient.invalidateQueries();
                form.reset();
                utils_notification_show({ crudType: "create", message: "Tạo thành công" });
                disc[1].close();
            })
            .catch((error) => {
                utils_notification_show({ crudType: "error", message: "Tạo chưa thành công", });
                console.error("Create rubric error:", error);
            });


        // Now you can send `finalPayload` to your API.
        // e.g., createRubricMutation.mutate(finalPayload);
    };


    // Ensure your form's onSubmit is wired correctly:
    // <form onSubmit={form.onSubmit(handleSubmit)}>
    return (
        <MyButtonModal
            disclosure={disc}
            label={buttonLabel}
            title="Chi tiết Rubric"
            modalSize={'90%'}
        >
            <form key="rubrics-create-form" onSubmit={form.onSubmit(handleSubmit)}>

                <Skeleton mb={10} visible={subjectQuery.isLoading || evaluationQuery.isLoading}>
                    <Grid w="100%">
                        <Grid.Col span={4}>
                            <MyTextInput label="Mã Rubric" {...form.getInputProps("code")} />
                            <MySelect
                                label="Chọn môn học"
                                placeholder="Chọn môn học"
                                data={subjectQuery.data?.map((item: any) => ({
                                    value: item.id.toString(),
                                    label: item.code || ""
                                })) || []}
                                // 6. Use `value` prop for a controlled component
                                value={selectedSubjectId?.toString() || null}
                                onChange={(data) => {
                                    const newId = data ? Number(data) : null;
                                    setSelectedSubjectId(newId);
                                    store.setProperty("rubrics", { ...store.state.rubrics, evaSubjectId: newId ?? 0 });
                                }}
                                clearable={false}
                            />
                            <MySelect
                                label="Thang đo đánh giá"
                                placeholder="Chọn thang đo đánh giá"
                                data={evaluationQuery.data?.map((item: any) => ({
                                    value: item.id.toString(),
                                    label: item.name ? `${item.code}-${item.name}` : item.code
                                })) || []}
                                // Use `value` prop for a controlled component
                                value={selectedEvaluationId?.toString() || null}
                                onChange={(data) => {
                                    const newId = data ? Number(data) : null;
                                    setSelectedEvaluationId(newId);
                                    store.setProperty("rubrics", { ...store.state.rubrics, evaEvaluationId: newId ?? 0 });
                                }}
                                clearable={false}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <MyTextInput label="Tên Rubric" {...form.getInputProps("name")} />
                            <MyTextInput
                                readOnly
                                label="Tên Môn học"
                                // 7. Use `value` with the derived name for instant updates
                                value={selectedSubjectName}
                            />
                        </Grid.Col>
                    </Grid>
                </Skeleton>

                <RubricsDetailTableCreate
                    rubricId={0}
                    evaluationDetailData={evaluationDetailQuery.data || []}
                    isLoading={evaluationDetailQuery.isLoading}
                    isError={evaluationDetailQuery.isError}
                />
                <Group grow>
                    <Button type="submit">Lưu</Button>
                </Group>
            </form>

        </MyButtonModal>
    );
}

// Mock data can be removed if you are fetching real data
// const mockData_course = [ ... ];
// const mockData_scale = [ ... ];
const mockData_course = [
    { label: "CSDLCB", value: "CSDLCB" },
    { label: "LY", value: "LY" },
    { label: "TOAN", value: "TOAN" },
    { label: "TOEIC", value: "TOEIC" },
    { label: "VAN", value: "VAN" },
]

const mockData_scale = [
    { label: "5 Bậc mức độ chất lượng", value: "1" },
    { label: "10 Bậc mức độ chất lượng", value: "2" },
    { label: "15 Bậc mức độ chất lượng", value: "3" },
]
