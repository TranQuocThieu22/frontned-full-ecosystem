'use client'
import { certificateReviewBatchService } from "@/shared/APIs/certificateReviewBatchService";
import { certificateService } from "@/shared/APIs/certificateService";
import { examService } from "@/shared/APIs/examService";
import { CertificateReviewBatch } from "@/shared/interfaces/certificateReviewBatch";
import { Exam } from "@/shared/interfaces/exam";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { ActionIcon, Button, Checkbox, Fieldset, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useListState } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useEffect, useMemo } from "react";

export default function CreateCertificateReviewBatchCreateUpdate({ values }: { values?: CertificateReviewBatch }) {
    const isUpdate = !!values
    const [selectedExams, selectedExamsHandlers] = useListState<Exam>([])
    const [modalOpened, modalHandlers] = useDisclosure(false)

    const certificateQuery = useCustomReactQuery({
        queryKey: ["certificateService.getAll"],
        axiosFn: () => certificateService.getAll()
    })

    const examQuery = useCustomReactQuery({
        queryKey: ["examService.getAll"],
        axiosFn: () => examService.getAll()
    })

    const form = useForm<CertificateReviewBatch>({
        mode: "uncontrolled",
        validate: {
            code: (v) => v ? null : "Không được để trống",
            name: (v) => isUpdate ? (v ? null : "Không được để trống") : null,
        }
    })

    useEffect(() => {
        const newValues = {
            ...values,
            code: values?.code ?? "",
            name: values?.name ?? "",
            conditionPass: values?.conditionPass ?? false,
            certificateId: values?.certificateId,
        }
        form.setInitialValues(newValues)
        form.setValues(newValues)
    }, [values])

    // Load initial exam selections for update
    useEffect(() => {
        if (!isUpdate || !examQuery.data || !values?.id) return
        const initial = examQuery.data.filter(e => e.certificateReviewBatchId === values.id)
        selectedExamsHandlers.setState(initial)
    }, [examQuery.data])

    const columnExam = useMemo<CustomColumnDef<Exam>[]>(() => [
        { accessorKey: "code", header: "Mã khóa thi" },
        { accessorKey: "name", header: "Tên khóa thi" },
    ], [])

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            form={form}
            modalProps={{ title: isUpdate ? "Cập nhật đợt xét cấp chứng chỉ" : "Tạo đợt xét cấp chứng chỉ", size: "80%" }}
            onSubmit={(formValues) => {
                const examIds = selectedExams.map(e => e.id).filter((id): id is number => id !== undefined)
                const { certificate, exams, ...body } = formValues
                return isUpdate
                    ? certificateReviewBatchService.update({ ...body, examIds })
                    : certificateReviewBatchService.create({ ...body, examIds })
            }}
        >
            <Stack>
                <TextInput label="Mã đợt xét cấp chứng chỉ" disabled={isUpdate} {...form.getInputProps("code")} />
                <TextInput label="Tên đợt xét cấp chứng chỉ" {...form.getInputProps("name")} />
                <Select
                    clearable
                    label="Chứng chỉ"
                    placeholder="Chọn chứng chỉ"
                    data={certificateQuery.data?.map(item => ({ value: item.id!.toString(), label: item.name ?? "" })) ?? []}
                    value={form.getValues().certificateId?.toString() ?? null}
                    onChange={(v) => form.setFieldValue("certificateId", v ? parseInt(v) : undefined)}
                />
                <Fieldset legend="Bộ điều kiện đạt">
                    <Checkbox label="Đạt thi" {...form.getInputProps("conditionPass", { type: "checkbox" })} />
                </Fieldset>
                <CustomFieldset title="Danh sách khóa thi cần xét">
                    <CustomDataTable
                        columns={columnExam}
                        data={selectedExams}
                        renderTopToolbarCustomActions={() => (
                            <Button onClick={modalHandlers.open}>Chọn từ danh sách</Button>
                        )}
                        renderRowActions={({ row }) => (
                            <ActionIcon color="red" onClick={() => selectedExamsHandlers.remove(row.index)}>
                                <IconX />
                            </ActionIcon>
                        )}
                    />
                    <Modal opened={modalOpened} onClose={modalHandlers.close} size="80%" title="Chọn khóa thi">
                        <CustomDataTable
                            enableRowSelection
                            columns={columnExam}
                            data={examQuery.data?.filter(e => !e.certificateReviewBatchId || e.certificateReviewBatchId === values?.id) ?? []}
                            renderTopToolbarCustomActions={({ table }) => (
                                <Button onClick={() => {
                                    selectedExamsHandlers.setState(table.getSelectedRowModel().rows.map(r => r.original))
                                    modalHandlers.close()
                                }}>Chọn</Button>
                            )}
                        />
                    </Modal>
                </CustomFieldset>
            </Stack>
        </CustomButtonCreateUpdate>
    )
}
