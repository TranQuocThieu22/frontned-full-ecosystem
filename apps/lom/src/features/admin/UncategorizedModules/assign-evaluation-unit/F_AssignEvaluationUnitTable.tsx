"use client";
import { service_COEGradeSubject } from "@/api/services/service_COEGradeSubject";
import { service_Department } from "@/api/services/service_department";
import { MyButton } from "@/components/ui/Buttons/Button/MyButton";
import { canSaveAssignEvaluationUnit } from "@/features/auth/PageAuthorization/assign-evaluation-unit.auth";
import { COEGradeSubject } from "@/interfaces/shared-interfaces/COEGradeSubject";
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { excelUtils } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Group, LoadingOverlay, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";

// export interface IPLO {
//     id?: number; // STT
//     ploCode?: string; // Mã PLO
//     content?: string; // Nội dung
//     ploDensity?: number; // Tỷ trọng PLO
//     pisCode?: string; // Mã PIs
//     pisDensity?: number; // Tỷ trọng Pis
//     content2?: string; // Nội dung 2
//     subjectCode?: string; // Mã môn học
//     subjectName?: string; // Tên môn học
//     credit?: number; // Tín chỉ
//     semester?: string; // Học kỳ
//     teachingUnit?: string; // Đơn vị giảng dạy
//     unitOfMeasurement?: string; // Đơn vị đo lường
//     unitOfReview?: string; // Đơn vị đánh giá
//     nguoiCapNhat?: string;
//     ngayCapNhat?: Date;
// }

export default function F_AssignEvaluationUnitTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const filterGradeStore = useFilterGradeStore();
    const [visibleLoadingOverlay, setLoadingOverlay] = useDisclosure(false);


    const UnitQuery = useCustomReactQuery({
        queryKey: ["F_rb55trm19d_Read_unitQuery"],
        axiosFn: async () => {
            const TYPE = 1;
            // const PARAM = `?type=${TYPE}`;
            // const response = await baseAxios.get(`/Department/FindbyType${PARAM}`);
            const result = await service_Department.findbyType({ type: TYPE })
            return result;
        },
        options: {
            refetchOnWindowFocus: false,
        }
    });

    const subjectByGrade = useCustomReactQuery({
        queryKey: ["F_rb55trm19d_Read_subjectByGrade"],
        axiosFn: async () => {
            const IS_CORE = true;
            // const PARAM = `?COEGradeId=${filterGradeStore.state.grade?.id}&IsCore=${IS_CORE}&cols=COESubject,ActivityPlan,COESubjectGroup,TeachingUnit,MeasureUnit,CollectUnit`;
            // const response = await baseAxios.get(`/COEGradeSubject/GetSubjectByCore${PARAM}`);
            const cols = 'COESubject,ActivityPlan,COESubjectGroup,TeachingUnit,MeasureUnit,CollectUnit'
            const result = await service_COEGradeSubject.getSubjectByCore({
                COEGradeId: filterGradeStore.state.grade?.id,
                isCore: IS_CORE,
                cols: cols
            })
            return result;
        },
        options: {
            enabled: !!filterGradeStore.state.grade?.id,
            refetchOnWindowFocus: false
        }
    });
    const [subjectByGradeList, setSubjectByGradeList] = useState<COEGradeSubject[]>([]);

    const handleFieldChange = (row: any, fieldName: keyof any, fieldValue: any) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null;

        setSubjectByGradeList((prev) => {
            // Check if the row already exists in editedExams
            const existingIndex = prev.findIndex((item) => item.id === row.id);

            if (existingIndex !== -1) {
                // Update existing row
                const updatedExams = [...prev];
                updatedExams[existingIndex] = {
                    ...updatedExams[existingIndex],
                    [fieldName]: fieldValue,
                };
                console.log(updatedExams);

                return updatedExams;
            } else {
                // Add new modified row
                return [
                    ...prev,
                    {
                        ...row,
                        [fieldName]: fieldValue,
                    },
                ];
            }
        });
    };
    const columns = useMemo<CustomColumnDef<COEGradeSubject>[]>(
        () => [
            {
                header: "Mã môn học",
                accessorKey: "subjectCode",
                accessorFn: row => row.coeSubject?.code,
                importFieldProps: { isRequired: true }
            },
            {
                header: "Tên môn học",
                accessorKey: "coeSubject.name"
            },
            {
                header: "Tín chỉ",
                accessorKey: "coeSubject.numberCredit",
                size: 100
            },
            {
                header: "Học kỳ",
                accessorKey: "activityPlan.name"
            },
            {
                // Ở đây trả về 3 phần:
                // phần accessorKey dành cho import
                // phần cell dành cho hiển thị ở bảng
                // phần accessorFN dành cho export
                header: "Đơn vị giảng dạy",
                accessorKey: "teachingUnitCode",
                importFieldProps: {},
                accessorFn: (row) => {
                    // <Select
                    //     placeholder="Chọn đơn vị"
                    //     defaultValue={row.teachingUnit?.id.toString() || UnitQuery.data?.[0]?.id?.toString()}
                    //     // defaultValue={"1045"}
                    //     data={
                    //         UnitQuery.data?.map((item) => ({
                    //             value: String(item.id),
                    //             label: String(item.name),
                    //         })) || []
                    //     }
                    //     onChange={(value) => {
                    //         handleFieldChange(row, "teachingUnitId", value === null ? null : parseInt(value));
                    //     }}
                    // />

                    return UnitQuery.data?.find(item => item.id == row.teachingUnit?.id)?.name
                },
                Cell: ({ row }) => {
                    return (
                        <Select
                            placeholder="Chọn đơn vị"
                            key={row.original.teachingUnit?.id.toString() + row.id}
                            defaultValue={row.original.teachingUnit?.id.toString() || null}//
                            // defaultValue={"1045"}
                            data={
                                UnitQuery.data?.map((item) => ({
                                    value: String(item.id),
                                    label: String(item.name),
                                })) || []
                            }
                            onChange={(value) => {
                                handleFieldChange(row.original, "teachingUnitId", value === null ? null : parseInt(value));
                            }}
                        />
                    )
                }
            },
            {
                // Ở đây trả về 3 phần:
                // phần accessorKey dành cho import
                // phần cell dành cho hiển thị ở bảng
                // phần accessorFN dành cho export
                header: "Đơn vị đo lường",
                accessorKey: "measureUnitCode",
                importFieldProps: {},
                Cell: ({ row }) => {
                    return (
                        <Select
                            placeholder="Chọn đơn vị"
                            key={row.original.measureUnit?.id.toString() + row.id}
                            defaultValue={row.original.measureUnit?.id.toString() || null} // || UnitQuery.data?.[0]?.id?.toString()
                            data={
                                UnitQuery.data?.map((item) => ({
                                    value: String(item.id),
                                    label: String(item.name),
                                })) || []
                            }
                            onChange={(value) => {
                                handleFieldChange(row.original, "measureUnitId", value === null ? null : parseInt(value));
                            }}
                        />
                    )
                },
                accessorFn: (row) => UnitQuery.data?.find(item => item.id == row.measureUnitId?.id)?.name

            },
            {
                // Ở đây trả về 3 phần:
                // phần accessorKey dành cho import
                // phần cell dành cho hiển thị ở bảng
                // phần accessorFN dành cho export
                header: "Đơn vị đánh giá",
                accessorKey: "collectUnitCode",
                importFieldProps: {},
                Cell: ({ row }) => {
                    return (
                        <Select
                            // ={subjectByGrade.isFetching}
                            placeholder="Chọn đơn vị"
                            key={row.original.collectUnit?.id.toString() + row.id}
                            // defaultValue={row.collectUnit?.id.toString() || null}
                            defaultValue={row.original.collectUnit?.id.toString() || null}
                            data={
                                UnitQuery.data?.map((item) => ({
                                    value: String(item.id),
                                    label: String(item.name),
                                })) || []
                            }
                            onChange={(value) => {
                                handleFieldChange(row.original, "collectUnitId", value === null ? null : parseInt(value));
                            }}
                        />
                    )
                },
                accessorFn: (row) => UnitQuery.data?.find(item => item.id == row.collectUnitId?.id)?.name,
            },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",
            // },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn(originalRow) {
            //         return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            //     },
            // }
        ],
        [subjectByGrade.data, UnitQuery.data]
    );

    useEffect(() => {
        if (!subjectByGrade.data?.length) return;
        setSubjectByGradeList(subjectByGrade.data.map(item => ({
            id: item.id,
            activityPlanId: item.activityPlanId,
            coeGradeId: item.coeGradeId,
            teachingUnitId: item.teachingUnitId,
            measureUnitId: item.measureUnitId,
            collectUnitId: item.collectUnitId,

            code: item.coeSubject?.code,
            name: item.coeSubject?.name,
            numberCredit: item.coeSubject?.numberCredit,
            coeSubjectGroupId: item.coeSubjectGroupId,
            coeSubjectId: item.coeSubjectId,
            isCore: item.isCore,
            order: item.order,
            courseSectionQuantity: item.courseSectionQuantity,
        })));
    }, [subjectByGrade.data]);

    if (subjectByGrade.isLoading) return "Đang tải dữ liệu...";
    if (subjectByGrade.isError) return "Đã xảy ra Lỗi, vui lòng thử lại!";
    if (UnitQuery.isLoading) return "Đang tải dữ liệu...";
    if (UnitQuery.isError) return "Đã xảy ra Lỗi, vui lòng thử lại!";

    return (
        <CustomFieldset title="Phân công đánh giá chương trình đào tạo">
            <LoadingOverlay visible={visibleLoadingOverlay} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <CustomDataTableAPI
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                query={subjectByGrade}
                exportProps={{
                    fileName: "Danh sách Phân công đánh giá chương trình đào tạo"
                }}
                deleteListFn={service_COEGradeSubject.removeGradeSubjectUnit}
                buttonImportProps={{
                    fileName: "Mẫu import danh sách Phân công đánh giá chương trình đào tạo",
                    onSubmit: (data) => {
                        setLoadingOverlay.open();
                        return service_COEGradeSubject.importGradeSubjectByCode(data.map(item => ({
                            subjectCode: item.subjectCode,
                            teachingUnitCode: item.teachingUnitCode,
                            measureUnitCode: item.measureUnitCode,
                            collectUnitCode: item.collectUnitCode,
                        })), { COEGradeId: filterGradeStore.state.grade?.id })
                            .then(res => {
                                setLoadingOverlay.close();
                                // subjectByGrade.refetch();
                                return res
                            })
                    },
                    onPrepareWorkbook: (workbook) => {
                        excelUtils.addSheet({
                            workbook, config: [
                                {
                                    fieldKey: "coeSubject.code",
                                    fieldName: "Mã Môn học",
                                },
                                {
                                    fieldKey: "coeSubject.name",
                                    fieldName: "Tên môn học",
                                },
                                {
                                    fieldKey: "coeSubject.numberCredit",
                                    fieldName: "Tín chỉ",
                                },
                                {
                                    fieldKey: "activityPlan.name",
                                    fieldName: "Học kỳ",
                                },

                            ],
                            data: subjectByGrade.data ?? [],
                            sheetName: "Danh sách môn học"
                        }),
                            excelUtils.addSheet({
                                workbook, config: [
                                    {
                                        fieldKey: "code",
                                        fieldName: "Mã Đơn vị",
                                    },
                                    {
                                        fieldKey: "name",
                                        fieldName: "Tên Đơn vị",
                                    },
                                ],
                                data: UnitQuery.data ?? [],
                                sheetName: "Danh sách Đơn vị"
                            })
                    },
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                {canSaveAssignEvaluationUnit(userStore, userPermissionStore) && <MyButton
                                    crudType="save"
                                    onClick={() =>
                                        service_COEGradeSubject.updateList(subjectByGradeList)
                                            .then((res) => {
                                                utils_notification_show({ crudType: "create" });
                                            }).catch((err) => {
                                                utils_notification_show({ crudType: "error" });
                                            })
                                    }
                                />}
                                {/* <PrototypeImportButton/>
                                <PrototypeExportButton/>
                                <PrototypeDeleteAllButton/> */}
                            </Group>
                        </>
                    );
                }}
            />
        </CustomFieldset>
    );
}

