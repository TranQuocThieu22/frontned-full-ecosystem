"use client"
import { addressService } from "@/shared/APIs/addressService";
import { accountService } from "@/shared/APIs/accountService";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { utils_notification_show } from "@/utils/notification";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Select } from '@mantine/core';
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { MyButtonModal, MyDataTable, MyFieldset, MyNumberInput } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { courseSectionService } from "@/shared/APIs/courseSectionService";
import DayOffInfo from "./DayOffInfo";

interface ScheduleDetailResponse {
  courseSectionScheduleInfo?: unknown[];
}

export default function DayOffDetailQuery(
  {
    courseSectionId,
    dayOffData

  }: {
    courseSectionId?: number,
    dayOffData?: any

  }
) {
  const disc = useDisclosure()
  const dayOffDetailQuery = useMyReactQuery({
    queryKey: ['dayOffDetailQuery', courseSectionId],
    axiosFn: () => {
      const PARAM = `referenceId=${dayOffData.id}`
      return courseSectionService.ScheduleDetail({ param: PARAM })
    },
    options: {
      enabled: disc[0] != false,
      refetchOnWindowFocus: false
    }
  })
  const addressQuery = useMyReactQuery({
    queryKey: ['addressQuery', courseSectionId],
    axiosFn: () => {
      const PARAM = `referenceId=${dayOffData.id}`
      return addressService.getAll({})
    },
    options: {
      enabled: disc[0] != false,
      refetchOnWindowFocus: false
    }
  })
  const lecturerQuery = useMyReactQuery({
    queryKey: ['lecturerQuery', courseSectionId],
    axiosFn: () => {
      const PARAM = `referenceId=${dayOffData.id}`
      return accountService.getAllLecturer()
    },
    options: {
      enabled: disc[0] != false,
      refetchOnWindowFocus: false
    }
  })
  const scheduleDetailData = dayOffDetailQuery.data as ScheduleDetailResponse | undefined;
  const courseSectionScheduleInfo = scheduleDetailData?.courseSectionScheduleInfo ?? [];
  const [editableData, setEditableData] = useState<any[]>([]);
  useEffect(() => {
    if (scheduleDetailData?.courseSectionScheduleInfo) {
      setEditableData(prev => prev.filter(
        (item: any) =>
          dayOffData.id !== item.id
      ));
      setEditableData(structuredClone(scheduleDetailData.courseSectionScheduleInfo));

    }
  }, [dayOffDetailQuery.data]);
  const handleFieldChange = (row: any, fieldName: keyof any, fieldValue: any) => {
    if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null
    setEditableData((prev) => {
      const existingIndex = prev.findIndex((item: any) => item.id === row.id);
      const updatedExams = [...prev];
      updatedExams[existingIndex] = {
        ...updatedExams[existingIndex],
        [fieldName]: fieldValue
      };
      return updatedExams;
    });
  };
  const queryClient = useQueryClient();
  const handleAddDayOff = () => {
    const filteredData = (courseSectionScheduleInfo || []).filter(
      (item: any) => dayOffData.id == item.id
    );
    const firstDayOff = (Array.isArray(filteredData) ? filteredData[0] : filteredData) as any;
    const newRow = {
      id: 0, // Temporary unique id, replace with backend id if needed
      code: firstDayOff?.code ?? "string",
      name: firstDayOff?.name ?? "string",
      concurrencyStamp: firstDayOff?.concurrencyStamp ?? "string",
      isEnabled: firstDayOff?.isEnabled ?? true,
      subjectName: firstDayOff?.subjectName ?? "string",
      courseSectionId: firstDayOff?.courseSectionId ?? 0,
      address: firstDayOff?.address || {},
      addressId: firstDayOff?.address?.id ?? 0,
      classPeriodStart: firstDayOff?.classPeriodStart ?? 0,
      classPeriodEnd: firstDayOff?.classPeriodEnd ?? 0,
      lecturerReview: firstDayOff?.lecturerReview ?? "string",
      startDate: firstDayOff?.startDate ? new Date(firstDayOff.startDate) : null,
      endDate: firstDayOff?.endDate ? new Date(firstDayOff.endDate) : null,
      referenceId: firstDayOff?.referenceId ?? 0,
      courseSectionScheduleLecturer: [{
        id: 0,
        code: "string",
        name: "string",
        concurrencyStamp: "string",
        isEnabled: true,
        modifiedWhen: new Date().toISOString(),
        modifiedBy: 0,
        userId: lecturerQuery.data?.[0]?.id ?? 0,
        courseSectionScheduleId: 0,
      }],
      courseSection: firstDayOff?.courseSection ?? {},
    };
    console.log(dayOffDetailQuery.data);

    // Update React Query cache
    queryClient.setQueryData(['dayOffDetailQuery', courseSectionId], (oldData: any = { courseSectionScheduleInfo: [] }) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        courseSectionScheduleInfo: [
          ...(oldData.courseSectionScheduleInfo || []),
          newRow,
        ],
      };
    });

    // Also update local state so UI re-renders
    setEditableData(prev => [...prev, newRow]);
  };
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      header: "Giảng viên",
      accessorKey: "lecturer",
      accessorFn: (row: any) => {
        return (
          <Select
            clearable={false}
            data={
              lecturerQuery.data?.map((user: any) => ({
                value: user.id?.toString(),
                label: `${user.fullName}`,
              })) || []
            }
            defaultValue={
              row.courseSectionScheduleLecturer?.[0]?.userId?.toString() || lecturerQuery.data?.[0]?.id?.toString()
            }
            onChange={(value) => {
              console.log(row.courseSectionScheduleLecturer);

              const selectedUser = lecturerQuery.data?.find((user: any) => user.id?.toString() === value);
              console.info("🚀 ~ DayOffDetail.tsx:156 ~ selectedUser:", selectedUser)
              handleFieldChange(row, "lecturer", selectedUser || null);

            }}
            placeholder="Chọn giảng viên"
          />
        )
      }
    },
    {
      header: "Ngày dạy",
      accessorKey: "startDate",
      size: 125,
      accessorFn: (row) => {
        return <DateInput
          clearable={false}
          placeholder="Chọn ngày sinh"
          defaultValue={row.startDate}
          onBlur={(e) => {
            handleFieldChange(row, "startDate", new Date(e.target.value + "z"))
          }}

        />
      }
    },
    {
      header: "Tiết bắt đầu",
      size: 150,
      accessorFn: (row) => {
        return <MyNumberInput
          hideControls
          defaultValue={row.classPeriodStart}
          onBlur={(e) => {
            // Calculate totalPeriodNumber from classPeriodEnd and classPeriodStart.
            // Assumes both values are numbers. If either is missing or invalid, defaults to 1.
            // This ensures the calculation does not break and provides a fallback value.
            const totalPeriodNumber =
              typeof row.classPeriodEnd === "number" && typeof row.classPeriodStart === "number"
                ? row.classPeriodEnd - row.classPeriodStart
                : 1;
            handleFieldChange(row, "classPeriodStart", Number(e.target.value));
            handleFieldChange(
              row,
              "classPeriodEnd",
              Number(e.target.value) + Number(totalPeriodNumber) - 1
            );
          }}
        />
      }
    },
    {
      header: "Số tiết",
      accessorKey: 'totalPeriodNumber',
      size: 110,
      accessorFn: (row) => {
        return <MyNumberInput
          hideControls
          defaultValue={row.classPeriodEnd - row.classPeriodStart + 1}
          onBlur={(e) => {
            // handleFieldChange(row, "totalPeriodNumber", Number(e.target.value))
            handleFieldChange(row, "classPeriodEnd", Number(row.classPeriodStart) + Number(e.target.value) - 1)
          }}
        />
      }
    },
    {
      header: "Phòng",
      accessorFn: (row) => {
        return (
          <Select
            clearable={false}
            data={
              addressQuery.data?.map((addr: any) => ({
                value: addr.id?.toString(),
                label: addr.name,
              })) || []
            }
            defaultValue={row.address?.id?.toString() || ""}
            onChange={(value) => {
              handleFieldChange(row, "addressId", Number(value))
            }}
            // onChange={(value) => ...}
            placeholder="Chọn phòng"
          />
        )
      }
    },
    {
      header: "Mã lớp",
      accessorFn: (row) => {
        return row.courseSection.code
      }
    },
    {
      header: "Sĩ số",
      size: 100,
      accessorFn: (row) => {
        return row.address.capacity
      }
    }
  ], [addressQuery.data, lecturerQuery.data])
  return (
    <MyButtonModal
      label="Xử lý"
      title="Chi tiết xử lý nghỉ dạy"
      disclosure={disc}
      modalSize={"80%"}
    >
      {dayOffDetailQuery.isSuccess && <DayOffInfo
        dayOffDetailQuery={
          // Return an object instead of array
          (courseSectionScheduleInfo || []).find(
            (item: any) => dayOffData.id == item.id
          ) || {}
        }

      />}
      {addressQuery.isSuccess && lecturerQuery.isSuccess && dayOffDetailQuery.isSuccess &&
        (
          <MyFieldset title="Danh sách buổi dạy bù" >
            <MyDataTable
              columns={columns}
              data={
                (courseSectionScheduleInfo || []).filter(
                  (item: any) => dayOffData.id !== item.id
                )
              }
              renderTopToolbar={({ table }) => (
                <>
                  <Button bg={"green"} m={10} onClick={() => {
                    const filteredData = editableData.filter((item: any) => dayOffData.id !== item.id);
                    setEditableData(filteredData);
                    console.log(editableData);

                    const body = filteredData.length
                      ? filteredData.map((item: any) => ({
                        id: item.id ?? 0,
                        code: item.code ?? "string",
                        name: item.name ?? "string",
                        concurrencyStamp: item.concurrencyStamp ?? "string",
                        isEnabled: item.isEnabled ?? true,
                        subjectName: item.subjectName ?? "string",
                        courseSectionId: item.courseSectionId ?? 0,
                        addressId: item.addressId ?? 0,
                        classPeriodStart: item.classPeriodStart ?? 0,
                        classPeriodEnd: item.classPeriodEnd ?? 0,
                        // lecturerReview: item.lecturerReview ?? "string",
                        startDate: item.startDate
                          ? new Date(item.startDate)
                          : new Date(),
                        endDate: item.endDate
                          ? new Date(item.endDate)
                          : new Date(),
                        referenceId: dayOffData.id ?? 0,
                        courseSectionScheduleLecturer: item.courseSectionScheduleLecturer
                          ? item.courseSectionScheduleLecturer.map((lect: any) => ({
                            id: lect.id ?? 0,
                            code: lect.code ?? "string",
                            name: lect.name ?? "string",
                            concurrencyStamp: lect.concurrencyStamp ?? "string",
                            isEnabled: lect.isEnabled ?? true,
                            modifiedWhen: lect.modifiedWhen ?? new Date().toISOString(),
                            modifiedBy: lect.modifiedBy ?? 0,
                            userId: item.lecturer?.id ?? lect.userId ?? 0, // 👈 conditional override here
                            courseSectionScheduleId: lect.courseSectionScheduleId ?? 0,
                            user: null,
                          }))
                          : [],
                      }))
                      : 0;

                    if (Array.isArray(body)) {
                      Promise.allSettled(
                        body.map(async (item) => {
                          const url = item.id !== 0
                            ? '/CourseSection/UpdateSectionSchedule'
                            : '/CourseSection/CreateSectionSchedule';
                          try {
                            await baseAxios.post(url, item);
                            utils_notification_show({
                              crudType: "update",
                              message: `Cập nhật thành công dữ liệu với ngày dạy ${utils_date_dateToDDMMYYYString(item.startDate)}`
                            });
                          } catch (error) {
                            utils_notification_show({
                              crudType: "error",
                              message: `Có lỗi xảy ra với dữ liệu có ngày dạy ${utils_date_dateToDDMMYYYString(item.startDate)}`
                            });
                            console.error(`Error with item ID: ${item.id}`, error);
                          }
                        })
                      );
                    }

                  }}>
                    Lưu
                  </Button>

                  <Button
                    bg={"green"}
                    m={5}
                    onClick={handleAddDayOff}
                  >
                    Thêm buổi
                  </Button>
                </>
              )}
            />
          </MyFieldset>
        )}
    </MyButtonModal>
  )
}