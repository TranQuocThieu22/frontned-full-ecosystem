import useQ_COEGrade_GetDetail from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetDetail";
import useQ_COEPLO_GetCOEPLOByGrade from "@/hooks/query-hooks/COEPLO/useQ_COEPLO_GetCOEPLOByGrade";
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { NumberInput, Table, Text } from "@mantine/core";
import React, { useEffect } from "react";
import useS_CLOPIMatrixStore from "./useS_CLOPIMatrixStore";

export default function F_CLOPIMatrixPrint() {
    const filterGradeStore = useFilterGradeStore()
    const store = useS_CLOPIMatrixStore()
    const ploByGrade = useQ_COEPLO_GetCOEPLOByGrade({
        params: `?coeGradeId=${filterGradeStore.state.grade?.id}&cols=COEPIs`
    })
    const subjectByGrade = useQ_COEGrade_GetDetail({
        params: `?gradeId=${filterGradeStore.state.grade?.id}`
    })
    useEffect(() => {
        store.setProperty("edited", {})
    }, [])
    return (
        <>
            <CustomButtonPrintPDF
                pageSize="A4-landscape"
            >
                <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    <CustomFlexColumn ta={'center'} gap={2}>
                        <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                        <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
                    </CustomFlexColumn>
                    <CustomFlexColumn ta={'center'} gap={2}>
                        <Text fw={'bold'} tt={"uppercase"}>Ma trận tỷ trọng CLO và PI</Text>
                        <Text fw={'bold'} tt={"uppercase"}>Chương trình: {filterGradeStore.state.program?.name}</Text>
                    </CustomFlexColumn>
                    <Text >Ma trận tích hợp giữa chuẩn đầu ra của môn học và chuẩn đầu ra của chương trình đào tạo</Text>
                    <Table highlightOnHover={false} striped style={{ border: "1px solid black" }}>
                        <Table.Thead style={{ border: "1px solid black" }}>
                            <Table.Tr style={{ border: "1px solid black" }}>
                                <Table.Th style={{ border: "1px solid black" }} colSpan={4} rowSpan={2}></Table.Th>
                                {ploByGrade.data?.map((item, idx) => (
                                    <Table.Th style={{ border: "1px solid black" }} ta={'center'} bg={'cyan'} key={idx} colSpan={item.coepIs?.length}>{item.code}</Table.Th>
                                ))}
                            </Table.Tr>
                            <Table.Tr >
                                {ploByGrade.data?.flatMap(item => item.coepIs).map((item, idx) => (
                                    <Table.Th style={{ border: "1px solid black" }} bg={'blue'} key={idx}>{item?.densityPI}</Table.Th>
                                ))}
                            </Table.Tr>
                            <Table.Tr>

                                <Table.Th style={{ border: "1px solid black" }}>Mã môn học</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Tên môn học</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Số tín chỉ</Table.Th>
                                <Table.Th style={{ border: "1px solid black" }}>Trọng số</Table.Th>


                                {ploByGrade.data?.flatMap(item => item.coepIs).map((item, idx) => (
                                    <Table.Th style={{ border: "1px solid black" }} bg={'green'} key={idx}>{item?.code}</Table.Th>
                                ))}
                            </Table.Tr>

                        </Table.Thead>


                        <Table.Tbody>
                            {subjectByGrade.data?.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <Table.Tr style={{ border: "1px solid black" }}>
                                        <Table.Td style={{ border: "1px solid black" }}>
                                            {item.coeSubject?.code}
                                        </Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>
                                            {item.coeSubject?.name}
                                        </Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>
                                            {/* Số tín chỉ */}
                                            <CustomFlexColumn w={70} gap={20} justify={'space-around'}>
                                                {/* {item.coecGs!.length > 0 &&
                                                    item?.coecGs!.flatMap(item => item.coeclOs).map((item, idx) => (
                                                        <Text key={idx}>{item?.code}</Text>
                                                    ))
                                                } */}
                                            </CustomFlexColumn>
                                        </Table.Td>
                                        <Table.Td style={{ border: "1px solid black" }}>
                                            {/* Tỷ trọng */}
                                            <CustomFlexColumn gap={20} justify={'space-around'}>
                                                {item.coecGs!.length > 0 &&
                                                    item?.coecGs!.flatMap(item => item.coeclOs).map((item, idx) => (
                                                        <Text key={idx}>{item?.densityCLO}%</Text>
                                                    ))
                                                }
                                            </CustomFlexColumn>
                                        </Table.Td>


                                        {/* Sửa lại code phần này để map đúng ma trận */}
                                        {ploByGrade.data?.flatMap(plo => plo.coepIs).map((pi, piIdx) => (
                                            <Table.Td style={{ border: "1px solid black" }} key={piIdx} miw={75} w={100}>
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
                </CustomFlexColumn>
            </CustomButtonPrintPDF>
        </>
    )
}
