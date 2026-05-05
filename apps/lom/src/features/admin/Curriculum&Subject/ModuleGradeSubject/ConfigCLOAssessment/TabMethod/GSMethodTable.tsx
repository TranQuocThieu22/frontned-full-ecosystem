'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Group, NumberInput, Textarea, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy, IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { IGSAssessment } from "../TabAssessment/Interfaces";
import { IGSFormula } from "../TabFormula/Interfaces";
import GSAssessmentUpdateActionIcon from "./GSMethodUpdateActionIcon";
import { IGSMethod } from "./Interfaces";

enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}

enum questionType {
    "Trắc nghiệm" = 1,
    "Tự luận" = 2,
    "Trắc nghiệm + Tự luận" = 3,
    "Tiểu luận" = 4,
    "Vấn đáp" = 5,
}

export default function GSMethodTable({ gradeSubjectId, assessmentId, formulaValues, assessmentValues }: { gradeSubjectId?: number, assessmentId?: number | null, formulaValues?: IGSFormula, assessmentValues?: IGSAssessment }) {
    const allGSMethods = useQuery<IGSMethod[]>({
        queryKey: [`COESubjectMethodByAssessment`, assessmentId],
        queryFn: async () => {
            if (!assessmentId) return [];
            let cols = "COECLO,COESubjectAssessment"
            const response = await baseAxios.get(`/COESubjectMethod/FindBySubjectAssessment?coeSubjectAssessmentId=${assessmentId}&cols=${cols}`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const [editedGSMethods, setEditedGSMethods] = useState<IGSMethod[]>([]);

    const columns = useMemo<MRT_ColumnDef<IGSMethod>[]>(() => [
        {
            header: "Hình thức đánh giá",
            accessorFn: (originalRow) => {
                return (formulaType[formulaValues?.formulaType!])
            }
        },
        {
            header: "Tỉ trọng CA",
            accessorFn: (originalRow) => {
                return (formulaValues?.rate!)
            }
        },
        {
            header: "Nội dung đánh giá",
            accessorKey: "coeSubjectAssessment.content",
        },
        {
            header: "Phương pháp đánh giá",
            accessorKey: "coeSubjectAssessment.questionType",
            accessorFn: (originalRow) => {
                return questionType[originalRow.coeSubjectAssessment?.questionType!]
            }
        },
        {
            header: "CLO",
            accessorKey: "coeclo.code",
        },
        // {
        //     header: "Tên CLO",
        //     accessorKey: "coeclo.name",
        //     size: 250,
        // },
        {
            header: "Mô tả CLO",
            accessorKey: "coeclo.description",
            size: 500,
            Cell: ({ row }) => {
                return (
                    <>
                        <Textarea
                            minLength={1}
                            variant="unstyled"
                            readOnly={true}
                            value={row.original.coeclo!.description}
                        />
                    </>
                )
            }
        },
        {
            header: "Tỷ trọng % CLO",
            Cell: ({ row }) => {
                return <NumberInput
                    min={0}
                    allowNegative={false}
                    placeholder="Nhập tỷ trọng CLO"
                    value={row.original.density ?? 0}
                    onChange={(value) => handleFieldChange(row.original, "density", Number(value))}
                />
            }
        },
        {
            header: "Bài đánh giá",
            Cell: ({ row }) => {
                return <TextInput
                    placeholder='Nhập tên bài đánh giá'
                    defaultValue={row.original.evaluation ?? undefined}
                    onBlur={(e) => handleFieldChange(row.original, "evaluation", e.currentTarget.value)}
                />
            },
            size: 500,
        },
        {
            header: "Số câu hỏi",
            accessorKey: "questionQuantity",
            Cell: ({ row }) => {
                return <NumberInput
                    min={0}
                    allowNegative={false}
                    placeholder="Nhập số câu hỏi"
                    value={row.original.questionQuantity ?? 0}
                    onChange={(value) => handleFieldChange(row.original, "questionQuantity", Number(value))}
                />
            }
        },
        {
            header: "Điểm tối đa",
            accessorKey: "maxPoint",
            Cell: ({ row }) => {
                return <NumberInput
                    min={0}
                    allowNegative={false}
                    placeholder="Nhập số câu hỏi"
                    value={row.original.maxPoint ?? 0}
                    onChange={(value) => handleFieldChange(row.original, "maxPoint", Number(value))}
                />
            }
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "modifiedBy",
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "modifiedWhen",
        //     accessorFn(originalRow) {
        //         return U0FormatToDateTimetring(new Date(originalRow.modifiedWhen!));
        //     },
        // }
    ], [formulaValues, assessmentValues, allGSMethods.data]);

    const handleFieldChange = (row: IGSMethod, fieldName: keyof IGSMethod, fieldValue: any) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null

        setEditedGSMethods((prev) => {
            // Check if the row already exists in editedGSMethods
            const existingIndex = prev.findIndex((item) => item.id === row.id);

            if (existingIndex !== -1) {
                // Update existing row
                const updatedGSMethods = [...prev];
                updatedGSMethods[existingIndex] = {
                    ...updatedGSMethods[existingIndex]!,
                    [fieldName]: fieldValue
                };
                return updatedGSMethods;
            } else {
                // Add new modified row
                return [...prev, {
                    ...row,
                    [fieldName]: fieldValue
                }];
            }
        });
    };

    const checkValidMaxPoint = (updatedExams: IGSMethod[]): boolean => {
        if (updatedExams.length === 0) {
            return true;
        }
        for (const exam of updatedExams) {
            if (exam.maxPoint === null || exam.maxPoint === undefined || exam.maxPoint === 0) {
                notifications.show({
                    title: "Cảnh báo",
                    message: `Điểm tối đa của một số phương pháp đánh giá không hợp lệ.`,
                    color: "red"
                });
                return false;
            }
        }
        return true;
    };

    const handleSaveButton = async () => {
        const updatedExams = editedGSMethods.map((GSMethod) => ({
            id: GSMethod.id,
            code: GSMethod.code,
            name: GSMethod.name,
            concurrencyStamp: GSMethod.concurrencyStamp,
            isEnabled: GSMethod.isEnabled,
            coeSubjectAssessmentId: GSMethod.coeSubjectAssessmentId,
            coecloId: GSMethod.coecloId,
            questionQuantity: GSMethod.questionQuantity,
            evaluation: GSMethod.evaluation,
            density: GSMethod.density,
            maxPoint: GSMethod.maxPoint,
        }));

        let valid = checkValidMaxPoint(updatedExams);
        if (!valid) {
            return;
        }

        let response = await baseAxios.post("/COESubjectMethod/UpdateList", updatedExams);
        if (response.data.isSuccess === 1) {
            notifications.show({
                title: "Lưu thành công",
                message: "Dữ liệu đã được lưu",
                color: "green"
            })
            setEditedGSMethods([]);
            allGSMethods.refetch();
        }
        if (response.data.isSuccess !== 1) {
            notifications.show({
                title: "Thao tác thất bại",
                message: "Dữ liệu chưa được lưu",
                color: "red"
            })
        }
    };

    return (
        <>
            <MyDataTable
                columns={columns}
                data={allGSMethods.data || []}
                state={{
                    isLoading: allGSMethods.isLoading
                }}
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 10 },
                    columnVisibility: {
                        ["coeclo.description"]: false,
                        ["coeSubjectAssessment.questionType"]: false,
                    }
                }}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button color="indigo" onClick={handleSaveButton} leftSection={<IconDeviceFloppy />}>Lưu</Button>
                        <Button leftSection={<IconTableExport />} color="teal" size="sm" radius="sm"
                            onClick={() => {
                                notifications.show({
                                    title: "Thông báo",
                                    message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                    color: "blue",
                                    autoClose: 5000,
                                })
                            }
                            }
                        >Export</Button>
                        {/* <Button color="red">Xóa</Button> */}
                    </Group>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            <Group gap={8}>
                                <GSAssessmentUpdateActionIcon
                                    GSMethodValues={row.original}
                                    gradeSubjectId={gradeSubjectId}
                                    assessmentId={assessmentId}
                                />
                            </Group>
                        </CustomCenterFull>
                    )
                }}
            />
        </>
    )
}