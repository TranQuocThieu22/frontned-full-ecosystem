'use client'
import { evaluationDetailService } from "@/shared/APIs/evaluationDetailService";
import { evaluationService } from "@/shared/APIs/evaluationService";
import { IEvaRubricsCriterias, IRubrics, rubricService } from "@/shared/APIs/rubricService";
import { rubricsCriteriaService } from "@/shared/APIs/rubricsCriteriaService";
import { subjectService } from "@/shared/APIs/subjectService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { Grid, Skeleton } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { MySelect, MyTextInput } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_notification_show } from "aq-fe-framework/utils";
import { useEffect, useState } from "react";
import RubricsDetailTableUpdate from "../ModuleRubric/RubricCatalog/RubricsDetail/RubricsDetailTableUpdate";
import useS_Rubrics from "../ModuleRubric/RubricCatalog/useS_Rubrics";

interface Props {
    rubric: IRubrics
}

export default function RubricsUpdate({ rubric }: Props) {
    const queryClient = useQueryClient()
    // The disclosure hook is likely part of MyActionIconUpdate, let's assume it manages the open state
    const disc = useDisclosure(false);
    const store = useS_Rubrics();

    // The form is correctly initialized with the rubric data
    const form = useForm<IRubrics>({
        initialValues: rubric,
        validate: {
            name: (value) => value ? null : 'Không được để trống',
        }
    });
    let totalDensityFlag = true
    // Local state for dropdowns, correctly initialized from the prop
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(rubric.evaSubjectId || null);
    const [selectedEvaluationId, setSelectedEvaluationId] = useState<number | null>(rubric.evaEvaluationId || null);

    // --- DATA FETCHING QUERIES ---
    // These queries are enabled only when the modal is open (isOpen is true)
    const subjectQuery = useMyReactQuery({
        queryKey: ['subjectQueryUpdate', rubric.id], // Use a unique key for this instance
        axiosFn: async () => subjectService.getAll(),
        options: {
            enabled: disc[0], // Only fetch when the modal is open
            refetchOnWindowFocus: false
        }
    });
    const evaluationQuery = useMyReactQuery({
        queryKey: ['evaluationQueryUpdate', rubric.id],
        axiosFn: async () => evaluationService.getAll(),
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false
        }
    });
    const evaluationDetailQuery = useMyReactQuery({
        queryKey: ['evaluationDetailQueryUpdate', selectedEvaluationId],
        axiosFn: async () => evaluationDetailService.GetEvaluationDetailsByEvaluationId({ param: `evaluationId=${selectedEvaluationId}` }),
        options: {
            enabled: disc[0] && selectedEvaluationId !== null,
            refetchOnWindowFocus: false
        }
    });

    // --- 1. CRITICAL FIX: INITIALIZE THE STORE WITH EXISTING DATA ---
    // This effect runs when the modal opens and populates the detail table's state.
    useEffect(() => {
        if (disc[0]) {
            // Re-initialize local state from the rubric prop every time it opens
            form.setValues(rubric);
            setSelectedSubjectId(rubric.evaSubjectId || null);
            setSelectedEvaluationId(rubric.evaEvaluationId || null);

            // Set the detail table's data from the incoming rubric prop
            store.setProperty("editedRubrics", rubric.evaRubricsCriterias || []);
        } else {
            // Optional: Clean up the store when the modal closes
            store.setProperty("editedRubrics", []);
        }
    }, [disc[0], rubric]); // Rerun if the modal is opened or the rubric prop changes

    // Get the current subject name. This will be "" during loading, then update correctly.
    const selectedSubjectName = subjectQuery.data?.find(
        (subject) => subject.id === selectedSubjectId
    )?.name || "";

    const handleSubmit = () => {
        const mainFormValues = form.getValues();
        // --- 1. GET THE DATA FROM THE STORE ---
        // The parent rows now already contain the properly nested evaRubricsCriteriaDetails
        const parentCriterias = store.state.editedRubrics ?? [];
        // --- 2. CLEAN AND PREPARE THE DATA ---
        // Since evaRubricsCriteriaDetails are already nested, we just need to clean up the parent objects
        const combinedAndCleanedCriterias = parentCriterias.map((parent: IEvaRubricsCriterias) => {
            // **IMPORTANT**: Build a NEW object with ONLY the keys the API expects
            const cleanedParent = {
                id: parent.id,
                code: parent.code,
                name: parent.name,
                concurrencyStamp: parent.concurrencyStamp || "asd",
                isEnabled: parent.isEnabled ?? true,
                density: parent.density,
                description: parent.description || "",
                evaRubricsId: rubric.id,
                evaEvaluationId: store.state.rubrics?.evaEvaluationId,

                evaRubricsCriteriaDetails: parent.evaRubricsCriteriaDetails || []
            };
            return cleanedParent;
        });

        // --- 3. ASSEMBLE THE FINAL PAYLOAD ---
        const finalPayload: IRubrics = {
            id: rubric.id,
            code: mainFormValues.code,
            name: mainFormValues.name,
            note: mainFormValues.note,
            concurrencyStamp: rubric.concurrencyStamp,
            isEnabled: true,
            evaSubjectId: selectedSubjectId !== null && selectedSubjectId !== undefined ? selectedSubjectId : rubric.evaSubjectId,
            evaEvaluationId: selectedEvaluationId !== null && selectedEvaluationId !== undefined ? selectedEvaluationId : rubric.evaEvaluationId,
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
                return false
            }
            if (totalDensity < 100) {
                utils_notification_show({
                    crudType: "error",
                    message: "Tổng mật độ tiêu chí phải bằng 100%. Vui lòng kiểm tra lại.",
                    color: "red"
                });
                return false
            }
        }
        if (totalDensityFlag) {

            if (store.state.deletedItems && store.state.deletedItems.length > 0) {
                rubricsCriteriaService.deleteList(store.state.deletedItems);
            }

            if (store.state.deletedSingleItem) {
                rubricsCriteriaService.delete(store.state.deletedSingleItem);
            }
            disc[1].close(); // Close the modal after submission
            return rubricService.update(finalPayload)
        }


    };

    return (
        <CustomButtonCreateUpdate
            isUpdate
            disclosure={disc}
            form={form}
            modalProps={{
                size: "90%",
                title: "Cập nhật Rubric"
            }}
            onSubmit={handleSubmit}
            useMyReactMutationProps={{
                successNotification: 'Cập nhật Rubric thành công'
            }}

        >
            <Skeleton mb={10} visible={subjectQuery.isLoading || evaluationQuery.isLoading}>
                <Grid w="100%">
                    <Grid.Col span={4}>
                        <MyTextInput readOnly label="Mã Rubric" {...form.getInputProps("code")} />
                        <MySelect
                            label="Chọn môn học"
                            placeholder="Đang tải..."
                            data={subjectQuery.data?.map((item: any) => ({
                                value: item.id.toString(),
                                label: item.code || ""
                            })) || []}
                            value={selectedSubjectId?.toString() || null}
                            onChange={(data) => setSelectedSubjectId(data ? Number(data) : null)}
                            clearable={false}
                        />
                        <MySelect
                            label="Thang đo đánh giá"
                            placeholder="Đang tải..."
                            data={evaluationQuery.data?.map((item: any) => ({
                                value: item.id.toString(),
                                label: item.name ? `${item.code}-${item.name}` : item.code
                            })) || []}
                            value={selectedEvaluationId?.toString() || null}
                            onChange={(data) => setSelectedEvaluationId(data ? Number(data) : null)}
                            clearable={false}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <MyTextInput label="Tên Rubric" {...form.getInputProps("name")} />
                        <MyTextInput
                            readOnly
                            label="Tên Môn học"
                            value={selectedSubjectName}
                        />
                    </Grid.Col>
                </Grid>
            </Skeleton>
            <RubricsDetailTableUpdate
                rubricId={rubric.id || 0}
                evaluationDetailData={evaluationDetailQuery.data || []}
                isLoading={evaluationDetailQuery.isLoading}
                isError={evaluationDetailQuery.isError}
            />
        </CustomButtonCreateUpdate>
    );
}