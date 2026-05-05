'use client'

import { service_COEGrade } from "@/api/services/service_COEGrade"
import { enum_proficiency, enumLabel_proficiency } from "@/data/enum/enum_proficiency"
import { canPrintCLOPIProportionMatrix, canSaveCLOPIProportionMatrix } from "@/features/auth/PageAuthorization/CLO-PI-proportion-matrix"
import useQ_COEPLO_GetCOEPLOByGrade from "@/hooks/query-hooks/COEPLO/useQ_COEPLO_GetCOEPLOByGrade"
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Group, NumberInput, ScrollArea, Space, Table, Text } from "@mantine/core"
import React, { useEffect } from "react"
import F_CLOPIMatrixPrint from "./F_CLOPIMatrixPrint"
import F_CLOPIMatrixUpdateRating from "./F_CLOPIMatrixUpdateRating"
import useS_CLOPIMatrixStore from "./useS_CLOPIMatrixStore"

export default function F_CLOPIMatrixTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const filterGradeStore = useFilterGradeStore()
    const store = useS_CLOPIMatrixStore()
    const ploByGrade = useQ_COEPLO_GetCOEPLOByGrade({
        params: `?coeGradeId=${filterGradeStore.state.grade?.id}&cols=COEPIs`
    })
    // const subjectByGrade = useQ_COEGrade_GetDetail({
    //     params: `?gradeId=${filterGradeStore.state.grade?.id}`
    // })

    const subjectByGrade = useCustomReactQuery({
        queryKey: ['subjects', 'byGradeId', filterGradeStore.state.grade?.id],
        options: {
            enabled: filterGradeStore?.state?.grade?.id != undefined
        },
        axiosFn: () => {
            console.log(filterGradeStore.state.grade?.id);

            return service_COEGrade.getDetail({ gradeId: filterGradeStore.state.grade?.id })
        }
    })
    useEffect(() => {
        store.setProperty("edited", {})
    }, [])
    // useEffect(() => {
    //     store.setProperty("edited", {})
    // }, [filterGradeStore.state.grade, filterGradeStore.state.program])
    if (subjectByGrade.isLoading) return "Đang tải dữ liệu..."
    if (subjectByGrade.isError) return "Có lỗi xảy ra"
    if (ploByGrade.isLoading) return "Đang tải dữ liệu..."
    if (ploByGrade.isError) return "Có lỗi xảy ra"
    if (filterGradeStore.state.noData) return (
        "Không có dữ liệu khóa"
    )

    return (
        <CustomFieldset title={`Ma trận tỷ trọng CLO và PI thuộc chương trình đào tạo - Khóa học ${filterGradeStore.state.grade?.code}`}>
            <Group>
                {canSaveCLOPIProportionMatrix(userStore, userPermissionStore) && <F_CLOPIMatrixUpdateRating />}
                {canPrintCLOPIProportionMatrix(userStore, userPermissionStore) && <F_CLOPIMatrixPrint />}
            </Group>
            <Space />
            <ScrollArea.Autosize>
                <Table highlightOnHover={false} striped>
                    <Table.Thead>

                        {/* HÀNG 1: 7 cột đầu + Nhóm mô tả (Kiến thức, Kỹ năng...) */}
                        <Table.Tr>
                            <Table.Th rowSpan={4}>STT</Table.Th>
                            <Table.Th rowSpan={4}>Năm học kỳ</Table.Th>
                            <Table.Th rowSpan={4}>Thứ tự</Table.Th>
                            <Table.Th rowSpan={4}>Mã môn học</Table.Th>
                            <Table.Th rowSpan={4}>Tên môn học</Table.Th>
                            <Table.Th rowSpan={4}>Mã CLO</Table.Th>
                            <Table.Th rowSpan={4}>Tỷ trọng</Table.Th>

                            {ploByGrade.data!.map((item, idx) => (
                                <Table.Th
                                    key={idx}
                                    colSpan={item.coepIs?.length}
                                    ta="center"
                                    bg="orange"
                                >
                                    {enumLabel_proficiency[item.proficiency as enum_proficiency] || ""}
                                </Table.Th>
                            ))}
                        </Table.Tr>

                        {/* HÀNG 2: Mã PLO */}
                        <Table.Tr>
                            {ploByGrade.data!.map((item, idx) => (
                                <Table.Th
                                    key={idx}
                                    colSpan={item.coepIs?.length}
                                    ta="center"
                                    bg="cyan"
                                >
                                    {item.code}
                                </Table.Th>
                            ))}
                        </Table.Tr>

                        {/* HÀNG 3: densityPI */}
                        <Table.Tr>
                            {ploByGrade.data?.flatMap(item => item.coepIs).map((item, idx) => (
                                <Table.Th bg="blue" key={idx}>{item?.densityPI}</Table.Th>
                            ))}
                        </Table.Tr>

                        {/* HÀNG 4: Mã PI */}
                        <Table.Tr>
                            {ploByGrade.data?.flatMap(item => item.coepIs).map((item, idx) => (
                                <Table.Th bg="green" key={idx}>{item?.code}</Table.Th>
                            ))}
                        </Table.Tr>

                    </Table.Thead>


                    <Table.Tbody>
                        {subjectByGrade.data?.map((item, idx) => (
                            <React.Fragment key={idx}>
                                <Table.Tr>
                                    <Table.Td >
                                        {idx + 1}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.coeSemester?.name}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.order}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.coeSubject?.code}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.coeSubject?.name}
                                    </Table.Td>
                                    <Table.Td>
                                        {/* Mã CLO */}
                                        <CustomFlexColumn w={70} gap={20} justify={'space-around'}>
                                            {item.coecGs!.length > 0 &&
                                                item?.coecGs!.flatMap(item => item.coeclOs).map((item, idx) => (
                                                    <Text key={idx}>{item?.code}</Text>
                                                ))
                                            }
                                        </CustomFlexColumn>
                                    </Table.Td>
                                    <Table.Td>
                                        {/* Tỷ trọng */}
                                        <CustomFlexColumn gap={20} justify={'space-around'}>
                                            {item.coecGs!.length > 0 &&
                                                item?.coecGs!.flatMap(item => item.coeclOs).map((item, idx) => (
                                                    <Text key={idx}>{item?.densityCLO}</Text>
                                                ))
                                            }
                                        </CustomFlexColumn>
                                    </Table.Td>


                                    {/* Sửa lại code phần này để map đúng ma trận */}
                                    {ploByGrade.data?.flatMap(plo => plo.coepIs).map((pi, piIdx) => (
                                        <Table.Td key={piIdx + filterGradeStore.state.grade?.id!} miw={75} w={100}>
                                            <CustomFlexColumn gap={10} justify={'space-around'}>
                                                {item.coecGs!.length > 0 &&
                                                    item.coecGs!.flatMap(cg => cg.coeclOs).map((clo, cloIdx) => {

                                                        // Find the relationship between this CLO and this PI
                                                        const relation = clo?.coeclopi?.find((cp: any) => cp.coepiId === pi?.id);
                                                        if (relation == null || relation == undefined) return (
                                                            <NumberInput disabled hideControls key={cloIdx} />
                                                        )
                                                        return (
                                                            <NumberInput max={100} hideControls key={cloIdx} defaultValue={relation?.rating} onChange={e => {
                                                                store.setProperty("edited", ({ ...store.state.edited, [relation.id!]: { ...relation, rating: e } }))
                                                            }} />
                                                        );
                                                    })
                                                }
                                            </CustomFlexColumn>
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            </React.Fragment>
                        ))}

                    </Table.Tbody>
                </Table>
            </ScrollArea.Autosize>
        </CustomFieldset>
    )
}