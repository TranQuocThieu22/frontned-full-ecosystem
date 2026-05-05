'use client'

import F_CLOPIMatrixPrint from "@/features/admin/UncategorizedModules/CLO-PI-proportion-matrix/F_CLOPIMatrixPrint";
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { NumberInput, ScrollArea, Space, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ICoreSubject } from "./Interface";


interface IPI extends BaseEntity {
    densityPI?: number
}

interface IPloByGrade extends BaseEntity {
    order?: number,
    coepIs?: IPI[]
}

export default function CoreSubjectTable() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    let [gradeDisplayName, setGradeDisplayName] = useState("")
    const gradeId = useFilterGradeStore().state.grade?.id
    const ploByGrade = useQuery<IPloByGrade[]>({
        queryKey: ["CoreSubjectTablePLO", gradeId],
        queryFn: async () => {
            if (!gradeId || gradeId == null) return []
            const res = await baseAxios.get(`/COEPLO/GetCOEPLOByGrade?coeGradeId=${gradeId}&cols=COEPIs`)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })
    const coreSubjectsByGrade = useQuery<ICoreSubject[]>({
        queryKey: ["CoreSubjectTable", gradeId],
        queryFn: async () => {
            if (!gradeId || gradeId == null) return []
            const res = await baseAxios.get(`/COEGrade/GetDetail?IsCore=true&gradeId=${gradeId}`)
            if (res.data.data.length > 0) {
                setGradeDisplayName(res.data.data[0]?.name)
            }
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    return (
        <>
            {/* <Group>
                {canExportReviewCLOPIProportionMatrix(userStore, userPermissionStore) && <PrototypeExportButton />}
            </Group> */}
            {/* Thêm chức năng in 15/10/2025  */}
            <F_CLOPIMatrixPrint />
            <Space />
            <ScrollArea.Autosize>
                <Table highlightOnHover={false} striped>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th colSpan={7} rowSpan={2}></Table.Th>
                            {ploByGrade.data?.map((item, idx) => (
                                <Table.Th ta={'center'} bg={'cyan'} key={idx} colSpan={item.coepIs?.length}>{item.code}</Table.Th>
                            ))}
                        </Table.Tr>
                        <Table.Tr >
                            {ploByGrade.data?.flatMap(item2 => item2.coepIs).map((item, idx) => (
                                <Table.Th bg={'blue'} key={idx}>{item?.densityPI}</Table.Th>
                            ))}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>STT</Table.Th>
                            <Table.Th>Năm học kỳ</Table.Th>
                            <Table.Th>Thứ tự</Table.Th>
                            <Table.Th>Mã môn học</Table.Th>
                            <Table.Th>Tên môn học</Table.Th>
                            <Table.Th>Mã CLO</Table.Th>
                            <Table.Th>Tỷ trọng</Table.Th>


                            {ploByGrade.data?.flatMap(item => item.coepIs).map((item, idx) => (
                                <Table.Th bg={'green'} key={idx}>{item?.code}</Table.Th>
                            ))}
                        </Table.Tr>

                    </Table.Thead>


                    <Table.Tbody>
                        {coreSubjectsByGrade.data?.map((item, idx) => (
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
                                        <Table.Td key={piIdx} miw={75} w={100}>
                                            <CustomFlexColumn gap={10} justify={'space-around'}>
                                                {item.coecGs!.length > 0 &&
                                                    item.coecGs!.flatMap(cg => cg.coeclOs).map((clo, cloIdx) => {
                                                        // Find the relationship between this CLO and this PI
                                                        const relation = clo?.coeclopi?.find((cp: any) => cp.coepiId === pi?.id);
                                                        if (relation == null || relation == undefined) return (
                                                            <NumberInput disabled hideControls key={cloIdx} />
                                                        )
                                                        return (
                                                            <NumberInput readOnly c="blue" hideControls key={cloIdx} defaultValue={relation?.rating}></NumberInput>
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
        </>
    )
}