'use client'

import { service_COESubjectAssessment } from "@/api/services/service_COESubjectAssessment"
import { canSaveCLOPIMatrix } from "@/features/auth/PageAuthorization/clo-PI-matrix.auth"
import useQ_COEGrade_GetDetail from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetDetail"
import useQ_COEPLO_GetCOEPLOByGrade from "@/hooks/query-hooks/COEPLO/useQ_COEPLO_GetCOEPLOByGrade"
import { COECLO } from "@/interfaces/shared-interfaces/COECLO"
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull"
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Checkbox, Group, ScrollArea, Space, Table, Text } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect } from "react"
import F_CLOPIRelation_Save from "./F_CLOPIRelation_Save"
import useS_CLOPIRelationMatrix from "./useS_CLOPIRelationMatrix"

export default function CLOPIRelationMatrixTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const filterGradeStore = useFilterGradeStore()
    const store = useS_CLOPIRelationMatrix()
    const queryClient = useQueryClient();

    const ploByGrade = useQ_COEPLO_GetCOEPLOByGrade({
        params: `?coeGradeId=${filterGradeStore.state.grade?.id}&cols=COEPIs`
    })
    const subjectByGrade = useQ_COEGrade_GetDetail({
        params: `?gradeId=${filterGradeStore.state.grade?.id}`
    })
    useEffect(() => {
        // Clear both edited and deleted state on component mount
        store.setProperty("edited", {})
        store.setProperty("deleted", {})
    }, [])

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
                {canSaveCLOPIMatrix(userStore, userPermissionStore) && < F_CLOPIRelation_Save onSave={async (data) => {
                    const response = await service_COESubjectAssessment.updateList(data)
                    if (response.data.isSuccess === 1) {
                        notifications.show({
                            title: 'Thao tác thành công',
                            message: 'Dữ liệu lưu thành công',
                            color: 'green',
                        })
                        await queryClient.invalidateQueries()
                    }
                    if (response.data.isSuccess !== 1) {
                        notifications.show({
                            title: 'Thao tác thất bại',
                            message: 'Dữ liệu chưa được xóa',
                            color: 'red',
                        })
                    }

                }} />}
                {/* <F_hxrvhadcfm_Print /> */}
            </Group>
            <Space />
            <ScrollArea.Autosize>
                <Table highlightOnHover={false} striped>

                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th colSpan={7} rowSpan={3}></Table.Th>
                            {ploByGrade.data!.map((item, idx) => (
                                <Table.Th ta={'center'} bg={'orange'} key={`plo-header-desc-${item.id || idx}`} colSpan={item.coepIs?.length}>
                                    {item.proficiency !== undefined ? Proficiency[item.proficiency] : "Chưa có dữ liệu"}
                                </Table.Th>
                            ))}
                        </Table.Tr>
                        <Table.Tr>
                            {ploByGrade.data!.map((item, idx) => (
                                <Table.Th ta={'center'} bg={'cyan'} key={`plo-header-${item.id || idx}`} colSpan={item.coepIs?.length}>{item.code}</Table.Th>
                            ))}
                        </Table.Tr>
                        <Table.Tr>
                            {ploByGrade.data?.flatMap((plo, ploIdx) =>
                                plo.coepIs?.map((pi, piIdx) => (
                                    <Table.Th bg={'blue'} key={`pi-density-${plo.id}-${pi?.id || `${ploIdx}-${piIdx}`}`}>
                                        <CustomCenterFull>
                                            {pi?.densityPI}
                                        </CustomCenterFull>
                                    </Table.Th>
                                )) || []
                            )}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>STT</Table.Th>
                            <Table.Th miw={200}>Năm học kỳ</Table.Th>
                            <Table.Th>Thứ tự</Table.Th>
                            <Table.Th>Mã môn học</Table.Th>
                            <Table.Th>Tên môn học</Table.Th>
                            <Table.Th>Mã CLO</Table.Th>
                            <Table.Th>Tỷ trọng</Table.Th>

                            {ploByGrade.data?.flatMap((plo, ploIdx) =>
                                plo.coepIs?.map((pi, piIdx) => (
                                    <Table.Th bg={'green'} key={`pi-code-${plo.id}-${pi?.id || `${ploIdx}-${piIdx}`}`}>
                                        <CustomCenterFull>
                                            {pi?.code}
                                        </CustomCenterFull>
                                    </Table.Th>
                                )) || []
                            )}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {subjectByGrade.data?.map((item, idx) => (
                            <React.Fragment key={`subject-${item.id || idx}`}>
                                <Table.Tr>
                                    <Table.Td >
                                        {idx + 1}
                                    </Table.Td>
                                    <Table.Td >
                                        {item.activityPlan?.name}
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
                                                item?.coecGs!.flatMap((cg, cgIdx) =>
                                                    cg.coeclOs?.map((clo: COECLO, cloIdx: number) => (
                                                        <Text key={`clo-code-${cg.id}-${clo?.id || `${cgIdx}-${cloIdx}`}`}>
                                                            {clo?.code}
                                                        </Text>
                                                    )) || []
                                                )
                                            }
                                        </CustomFlexColumn>
                                    </Table.Td>
                                    <Table.Td>
                                        {/* Tỷ trọng */}
                                        <CustomFlexColumn gap={20} justify={'space-around'}>
                                            {item.coecGs!.length > 0 &&
                                                item?.coecGs!.flatMap((cg, cgIdx) =>
                                                    cg.coeclOs?.map((clo: COECLO, cloIdx: number) => (
                                                        <Text key={`clo-density-${cg.id}-${clo?.id || `${cgIdx}-${cloIdx}`}`}>
                                                            {clo?.densityCLO}
                                                        </Text>
                                                    )) || []
                                                )
                                            }
                                        </CustomFlexColumn>
                                    </Table.Td>

                                    {/* Matrix checkboxes */}
                                    {ploByGrade.data?.flatMap((plo, ploIdx) =>
                                        plo.coepIs?.map((pi, piIdx) => {

                                            return (
                                                <Table.Td key={`matrix-cell-${plo.id}-${pi?.id || `${ploIdx}-${piIdx}`}`} miw={75} w={100}>
                                                    <CustomFlexColumn gap={20} justify={'center'} align={"center"}>
                                                        {item.coecGs!.length > 0 &&
                                                            item.coecGs!.flatMap((cg, cgIdx) =>
                                                                cg.coeclOs?.map((clo: COECLO, cloIdx: number) => {
                                                                    // Find the relationship between this CLO and this PI
                                                                    const relation = clo?.coeclopi?.find(cp => cp.coepiId === pi?.id);

                                                                    // Check if there's an edited version of this relation
                                                                    const isDeleted = relation ? store.state.deleted?.[relation.id!.toString()] : false;

                                                                    const newRelation = Object.values(store.state.edited || {}).find(
                                                                        (editedRel: any) => editedRel.coecloId === clo?.id && editedRel.coepiId === pi?.id
                                                                    );
                                                                    // Determine if checkbox should be checked
                                                                    const isChecked = (() => {
                                                                        // If there's a new relation created, show as checked
                                                                        if (newRelation) return true;
                                                                        // If original relation exists and not marked for deletion, show as checked
                                                                        if (relation && !isDeleted) return true;
                                                                        // Otherwise, show as unchecked
                                                                        return false;
                                                                    })();

                                                                    return (
                                                                        <Checkbox h={'25px'}
                                                                            key={`checkbox-${cg.id}-${clo?.id}-${pi?.id || `${cgIdx}-${cloIdx}-${piIdx}`}`}
                                                                            checked={isChecked}
                                                                            onChange={(event) => {

                                                                                if (event.currentTarget.checked) {

                                                                                    // If checking and no relation exists, create a new relation
                                                                                    if (!relation) {
                                                                                        const tempId = -(Date.now() + Math.random() * 1000);
                                                                                        const newRelation = {
                                                                                            id: tempId,
                                                                                            coecloId: clo?.id,
                                                                                            coepiId: pi?.id,

                                                                                            rating: 1,
                                                                                        };

                                                                                        const updatedEdited = {
                                                                                            ...store.state.edited,
                                                                                            [tempId.toString()]: newRelation
                                                                                        };

                                                                                        store.setProperty("edited", updatedEdited);
                                                                                    } else if (isDeleted) {
                                                                                        // If checking a relation that was marked for deletion, remove the deletion flag
                                                                                        const updatedDeleted = { ...store.state.deleted };
                                                                                        delete updatedDeleted[relation.id!.toString()];
                                                                                        store.setProperty("deleted", updatedDeleted);
                                                                                    }
                                                                                } else {

                                                                                    // If unchecking
                                                                                    if (newRelation) {
                                                                                        // Remove the newly created relation
                                                                                        const updatedEdited = { ...store.state.edited };
                                                                                        delete updatedEdited[newRelation.id!.toString()];
                                                                                        store.setProperty("edited", updatedEdited);
                                                                                    } else if (relation) {
                                                                                        // Mark existing relation for deletion
                                                                                        const updatedDeleted = {
                                                                                            ...store.state.deleted,
                                                                                            [relation.id!.toString()]: true
                                                                                        };
                                                                                        store.setProperty("deleted", updatedDeleted);
                                                                                    }
                                                                                }
                                                                            }}
                                                                        />
                                                                    );
                                                                }) || []
                                                            )
                                                        }
                                                    </CustomFlexColumn>
                                                </Table.Td>
                                            );
                                        }) || []
                                    )}
                                </Table.Tr>
                            </React.Fragment>
                        ))}

                    </Table.Tbody>
                </Table>
            </ScrollArea.Autosize>
        </CustomFieldset>
    )
}

enum Proficiency {
    "Kiến thức" = 1,
    "Kỹ năng" = 2,
    "Năng lực tự chủ và trách nhiệm" = 3
}