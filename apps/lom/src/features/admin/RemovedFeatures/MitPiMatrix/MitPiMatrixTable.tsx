'use client'
import useQ_COEGrade_GetDetail from '@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetDetail'
import useQ_COEPLO_GetCOEPLOByGrade from '@/hooks/query-hooks/COEPLO/useQ_COEPLO_GetCOEPLOByGrade'
import useFilterGradeStore from '@/shared/features/FilterGradeSelect/useFilterGradeStore'
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton'
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset'
import { CustomFlexColumn } from '@aq-fe/core-ui/shared/components/layout/CustomFlexColumn'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils'
import { Group, NumberInput, ScrollArea, Space, Table } from '@mantine/core'
import React, { useEffect, useState } from 'react'
interface CoePiRating {
  id: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  modifiedWhen?: string; // ISO 8601 date string
  modifiedBy?: number;
  coeGradeSubjectId?: number;
  coepiId?: number;
  rating?: number | null;
}

export default function MitPiMatrixTable() {
  const filterGradeStore = useFilterGradeStore()

  const ploByGrade = useQ_COEPLO_GetCOEPLOByGrade({
    params: `?coeGradeId=${filterGradeStore.state.grade?.id}&cols=COEPIs`
  })
  const subjectByGrade = useQ_COEGrade_GetDetail({
    params: `?gradeId=${filterGradeStore.state.grade?.id}`
  })
  const [gradeSubject, setGradeSubject] = useState<CoePiRating[]>([]);

  useEffect(() => {
    if (subjectByGrade.data && ploByGrade.data) {
      const initialGradeSubjects = subjectByGrade.data.flatMap((subject) =>
        ploByGrade.data.flatMap((plo) =>
          (plo.coepIs ?? []).map((pi) => {
            const existingEntry = subject.coeGradeSubjectMITPIs?.find(
              (entry) => entry.coepiId === pi.id
            );
            return {
              id: existingEntry?.id ?? 0, // Use the id from existing entry if available
              code: '',
              name: '',
              concurrencyStamp: '',
              isEnabled: true,
              modifiedWhen: new Date().toISOString(),
              modifiedBy: 0, // Replace with actual user ID if available
              coeGradeSubjectId: subject.id ?? 0, // Provide a default value
              coepiId: pi.id ?? 0, // Provide a default value
              rating: existingEntry?.rating ?? null, // Use the rating from existing entry if available
            };
          })
        )
      );
      setGradeSubject(initialGradeSubjects);
    }
  }, [subjectByGrade.data, ploByGrade.data]);
  if (subjectByGrade.isLoading) return "Đang tải dữ liệu..."
  if (subjectByGrade.isError) return "Có lỗi xảy ra"
  if (ploByGrade.isLoading) return "Đang tải dữ liệu..."
  if (ploByGrade.isError) return "Có lỗi xảy ra"
  if (filterGradeStore.state.noData) return (
    "Không có dữ liệu khóa"
  )

  return (
    <CustomFieldset title={`Ma trận mức độ đo MIT và Pis thuộc chương trình đào tạo - Khóa học ${filterGradeStore.state.grade?.code}`}>
      <Group>
        <CustomButton actionType='save' onClick={() => {
          baseAxios.post("/COEGrade/GradeSubjectMITPIRating", gradeSubject)
            .then(() => {
              utils_notification_show({ crudType: 'update', message: 'Cập nhật thành công!' });
            })
            .catch(() => {
              utils_notification_show({ crudType: 'error', message: 'Cập nhật thất bại!' });
            });
        }} />
      </Group>
      <Space />
      <ScrollArea.Autosize>
        <Table highlightOnHover={false} striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th colSpan={7} rowSpan={2}></Table.Th>
              {ploByGrade.data!.map((item, idx) => (
                <Table.Th ta={'center'} bg={'cyan'} key={idx} colSpan={item.coepIs?.length}>{item.code}</Table.Th>
              ))}
            </Table.Tr>
            <Table.Tr >
              {ploByGrade.data?.flatMap(item => item.coepIs).map((item, idx) => (
                <Table.Th bg={'blue'} key={idx}>{item?.densityPI}</Table.Th>
              ))}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>STT</Table.Th>
              <Table.Th miw={200}>Năm học kỳ</Table.Th>
              <Table.Th>Thứ tự</Table.Th>
              <Table.Th>Mã môn học</Table.Th>
              <Table.Th>Tên môn học</Table.Th>
              <Table.Th>Nhóm môn học</Table.Th>
              <Table.Th>Mức MIT</Table.Th>


              {ploByGrade.data?.flatMap(item => item.coepIs).map((item, idx) => (
                <Table.Th bg={'green'} key={idx}>{item?.code}</Table.Th>
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
                    {item.coeSubject?.code} - {item.coeSubject?.id}
                  </Table.Td>
                  <Table.Td >
                    {item.coeSubject?.name}
                  </Table.Td>
                  <Table.Td>
                    {/* Mã CLO */}
                    <CustomFlexColumn w={70} gap={20} justify={'space-around'}>
                      {item.coeSubjectGroup?.code} - {item.coeSubjectGroup?.id}
                    </CustomFlexColumn>
                  </Table.Td>
                  <Table.Td>
                    {/* Tỷ trọng */}
                    <CustomFlexColumn gap={20} justify={'space-around'}>
                      {item.coeSubjectGroup?.coemitScale?.name ?? ''}
                    </CustomFlexColumn>
                  </Table.Td>


                  {/* Sửa lại code phần này để map đúng ma trận */}
                  {ploByGrade.data?.flatMap(plo => plo.coepIs).map((pi, piIdx) => (
                    <Table.Td key={piIdx} miw={75} w={100}>
                      <CustomFlexColumn gap={10} justify={'space-around'}>
                        <NumberInput
                          key={piIdx}
                          max={5} min={1}
                          hideControls
                          defaultValue={
                            item.coeGradeSubjectMITPIs?.find(
                              (entry) => entry.coepiId === pi?.id && entry.coeGradeSubjectId === item.id
                            )?.rating ?? undefined
                          }
                          onBlur={(e) => {
                            setGradeSubject((prev) => {
                              const existingIndex = prev.findIndex(
                                (entry) =>
                                  entry.coeGradeSubjectId === item.id &&
                                  entry.coepiId === pi?.id
                              );

                              if (existingIndex !== -1) {
                                const updatedEntries = [...prev];
                                updatedEntries[existingIndex] = {
                                  ...updatedEntries[existingIndex]!,
                                  rating: e === null || typeof e === 'number' ? e : parseFloat(e.target.value) || null,
                                };
                                return updatedEntries;
                              } else {
                                return [
                                  ...prev,
                                  {
                                    id: item.coeGradeSubjectMITPIs?.find(
                                      (entry) => entry.coepiId === pi?.id
                                    )?.id ?? 0, // Temporary unique ID
                                    code: '',
                                    name: '',
                                    coeGradeSubjectId: item.id ?? 0, // Provide a default value
                                    coepiId: pi?.id ?? 0, // Provide a default value
                                    rating: parseFloat(e.target.value) || null,
                                  },
                                ];
                              }
                            });
                            // return handleFieldChange(item.coeSubjectGroup?.coemitScale, "coeSubjectGroup", 1) 
                          }} />
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
