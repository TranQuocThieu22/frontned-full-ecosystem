'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Group, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { IGSAssessment } from "../TabAssessment/Interfaces";
import { IGSFormula } from "../TabFormula/Interfaces";
import F_TabAssessmentByTool_Print from "./F_TabAssessmentByTool_Print";
import { ICOERubric, ICOESubjectMethodRubricModel, IGSMethodWithRubrics } from "./Interfaces";

enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}


export default function GSMethodByRubricsTable({ gradeSubjectId, assessmentId, formulaValues, assessmentValues }: { gradeSubjectId?: number, assessmentId?: number | null, formulaValues?: IGSFormula, assessmentValues?: IGSAssessment }) {

    const initGSMethodRubricModel = {
        id: 0,
        code: null,
        name: null,
        concurrencyStamp: "string",
        isEnabled: true,
        coeSubjectMethodId: null,
        coeRubricsMethodId: null,
        content: "",
    }

    const allRubrics = useQuery<ICOERubric[]>({
        queryKey: [`AllRubrics`],
        queryFn: async () => {
            const response = await baseAxios.get(`/COERubricsMethod/GetAll`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const allGSMethodWithRubrics = useQuery<IGSMethodWithRubrics[]>({
        queryKey: [`GSMethodByRubricsTable`, assessmentId],
        queryFn: async () => {
            if (!assessmentId) return [];
            let cols = "COECLO,COESubjectAssessment,COESubjectMethodRubrics"
            const response = await baseAxios.get(`/COESubjectMethod/FindBySubjectAssessment?coeSubjectAssessmentId=${assessmentId}&cols=${cols}`);

            response.data.data.forEach((item: IGSMethodWithRubrics) => {
                allRubrics.data?.forEach((rubric: ICOERubric) => {
                    const existingRubric = item.coeSubjectMethodRubrics?.find((r: any) => r.coeRubricsMethodId === rubric.id);
                    if (!existingRubric) {
                        item.coeSubjectMethodRubrics?.push({
                            ...initGSMethodRubricModel,
                            coeSubjectMethodId: item.id,
                            coeRubricsMethodId: rubric.id,
                            content: "",
                        });
                    }
                }
                )
            })
            return response.data.data || [];
        },
        enabled: allRubrics.isSuccess,
        refetchOnWindowFocus: false,
    })

    const [editedGSMethodWithRubrics, setEditedGSMethodWithRubrics] = useState<IGSMethodWithRubrics[]>([]);

    const columns = useMemo<MRT_ColumnDef<IGSMethodWithRubrics>[]>(() => [
        {
            header: "Hình thức đánh giá",
            accessorFn: (originalRow) => {
                return (formulaType[formulaValues?.formulaType!])
            }
        },
        {
            header: "Nội dung đánh giá",
            accessorKey: "coeSubjectAssessment.content"
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

        ...(allRubrics.data?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((rubric, index) => ({
            header: rubric.name,
            // accessorFn: (row: IGSMethodWithRubrics) => {}
            Cell: ({ row }) => {
                return (
                    <>
                        <Textarea
                            variant="unstyled"
                            placeholder="nhập dữ liệu"
                            defaultValue={row.original.coeSubjectMethodRubrics?.filter((item: any) => item.coeRubricsMethodId === rubric.id)[0]?.content ?? ""}
                            onBlur={(e) => handleChangeEachRubricInMethod(row.original, rubric.id!, e.currentTarget.value)}
                        />
                    </>
                );
            },
            size: 300,
        })
        ) as MRT_ColumnDef<IGSMethodWithRubrics>[] ?? []),
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
    ], [
        allGSMethodWithRubrics.data,
        allRubrics.data
    ]);

    const handleChangeEachRubricInMethod = (row: IGSMethodWithRubrics, rubricId: number, fieldValue: any) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null

        setEditedGSMethodWithRubrics((prev) => {
            const existingIndex = prev.findIndex((item) => item.id === row.id);

            if (existingIndex !== -1) {
                const updatedGSMethodWithRubrics = [...prev];
                updatedGSMethodWithRubrics[existingIndex]!.coeSubjectMethodRubrics?.forEach((item) => {
                    if (item.coeRubricsMethodId === rubricId) {
                        item.content = fieldValue;
                    }
                })
                return updatedGSMethodWithRubrics;

            } else {
                const newGSMethodWithRubrics = { ...row };
                newGSMethodWithRubrics.coeSubjectMethodRubrics?.forEach((item) => {
                    if (item.coeRubricsMethodId === rubricId) {
                        item.content = fieldValue;
                    }
                })
                return [...prev, newGSMethodWithRubrics];
            }
        });
    };

    const handleSaveButton = async () => {
        let rubricsListData: ICOESubjectMethodRubricModel[] = [];
        editedGSMethodWithRubrics.forEach((item) => {
            item.coeSubjectMethodRubrics?.forEach((rubric) => {
                if (rubric.id === 0 && rubric.content === '') return;
                rubricsListData.push(rubric);
            })
        })

        let response = await baseAxios.post("/COESubjectMethodRubrics/CreateOrUpdateList", rubricsListData);
        if (response.data.isSuccess === 1) {
            notifications.show({
                title: "Lưu thành công",
                message: "Dữ liệu đã được lưu",
                color: "green"
            })
            setEditedGSMethodWithRubrics([]);
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
                data={allGSMethodWithRubrics.data || []}
                state={{
                    isLoading: allGSMethodWithRubrics.isFetching || allRubrics.isFetching
                }}
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 10 },
                    columnVisibility: {
                        ["coeclo.description"]: false,
                    }
                }}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={(row) => (
                    <Group>
                        <Button color="blue" onClick={handleSaveButton} leftSection={<IconPlus />}>Lưu</Button>
                        {/* <Button leftSection={<IconTablePlus />} color="green" size="sm" radius="sm"
                            onClick={() => {
                                notifications.show({
                                    title: "Thông báo",
                                    message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                    color: "blue",
                                    autoClose: 5000,
                                })
                            }
                            }
                        >Import</Button>
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
                        >Export</Button> */}
                        {/* <Button color='red'>Xóa</Button> */}
                        <F_TabAssessmentByTool_Print formulaValues={formulaValues} values={allGSMethodWithRubrics.data!} />
                    </Group>
                )}
            />
        </>
    )
}