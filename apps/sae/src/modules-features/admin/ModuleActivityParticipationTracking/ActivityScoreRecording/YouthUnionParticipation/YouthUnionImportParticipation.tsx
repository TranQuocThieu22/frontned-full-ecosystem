"use client"
import { service_account } from '@/api/services/service_account';
import { service_studentsActivityParticipation } from '@/api/services/service_studentsActivityParticipation';
import { Event } from '@/interfaces/event';
import { StudentEvent } from '@/interfaces/StudentEvent';
import { FileButton, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFileExport, IconFileImport, IconFileXFilled, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import * as XLSX from "xlsx";
import YouthUnionButtonDelete from './YouthUnionButtonDelete';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCheckbox } from '@aq-fe/core-ui/shared/components/input/CustomCheckbox';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';


export default function YouthUnionImportParticipation({ eventValue }: { eventValue: Event }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const [fileInput, setFileInput] = useState<File | null>(null);

    const disc = useDisclosure();
    const queryClient = useQueryClient();

    const studentEventQuery = useCustomReactQuery({
        queryKey: ["YouthUnionImportParticipation_GetBy", eventValue.id],
        axiosFn: () => service_studentsActivityParticipation.getBy(
            `?eventid=${eventValue.id}`
        ),
        options: {
            enabled: disc[0],
        },
    })

    const studentQuery = useCustomReactQuery({
        queryKey: ["students", eventValue.id],
        axiosFn: () => service_account.getStudentList({
            paging: {
                pageNumber: 1,
                pageSize: 100,
            },
        }),
        options: {
            enabled: disc[0],
        }
    })

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet([]);

        const headers: { [key: string]: string } = { "studentCode": "studentCode", "point": "point" };

        XLSX.utils.sheet_add_aoa(worksheet, [Object.values(headers)], { origin: "A1" });

        // Export worksheet as an Excel file
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data");

        // Trigger the download
        XLSX.writeFile(workbook, `File_Cau_Truc_SV.xlsx`);
    };

    const importFileMutate = useMutation(
        {
            mutationFn: async (fileData: any[]) => {
                const params = `?eventId=${eventValue.id}`;
                const response = await axiosInstance.post(`Event/ImportParticipate${params}`, fileData);

                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries();
                utils_notification_show({ crudType: "update", message: "Đã import data thành công." });
            },
        }
    );

    useEffect(() => {
        if (fileData.length > 0) {
            importFileMutate.mutate(fileData);
        }
    }, [fileData]);

    useEffect(() => {
        if (fileInput === null) return
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target?.result;

            if (binaryStr) {
                const workbook = XLSX.read(binaryStr, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName ?? ''];
                const data = XLSX.utils.sheet_to_json(sheet ?? {});

                const validData = data.filter((row: any) => row.studentCode && row.point);

                if (validData.length === 0) {
                    notifications.show({
                        title: 'Cập nhật khônng thành công',
                        message: 'File không có dữ liệu hợp lệ',
                        color: 'red'
                    })
                    setFileInput(null);
                    return;
                }
                setFileData(validData);
            }
        };
        reader.readAsArrayBuffer(fileInput);
    }, [fileInput])

    const columns = useMemo<MRT_ColumnDef<StudentEvent>[]>(() => [
        { header: "Họ và tên", accessorKey: "studentName", },
        {
            header: "Điểm", accessorKey: "point", size: 80,
            accessorFn: (row) =>
                <CustomCenterFull >
                    <Text fz="sm"> {row.point}</Text>
                </CustomCenterFull>
        },
        {
            header: "Đăng ký", accessorKey: "isRegistration", size: 80,
            accessorFn: (row) =>
                <CustomCenterFull >
                    <CustomCheckbox
                        checked={row.isRegistration}
                        readOnly
                    />
                </CustomCenterFull>
        }
    ], [])

    if (studentEventQuery.isLoading || studentQuery.isLoading) return "Loading...";

    return (
        <Group>
            <CustomButtonModal
                isActionIcon
                modalProps={{
                    size: "60%",
                    title: "Danh sách sinh viên tham gia"
                }}
                actionIconProps={{
                    variant: "transparent",
                    children: < IconFileImport color="#0dcaf0" style={{ background: 'transparent' }} />

                }}
                disclosure={disc}
            >
                <CustomDataTable
                    initialState={{
                        pagination: {
                            pageIndex: 0,
                            pageSize: 10
                        }
                    }}
                    enableRowNumbers={true}
                    enableColumnFilterModes={true}
                    enableColumnFilters={true}

                    columns={columns}
                    data={studentEventQuery.data || []}

                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                <YouthUnionButtonDelete id={row.original!.id!} name={row.original!.studentName!} />
                            </CustomCenterFull>
                        )
                    }}
                />
                <Flex direction="row" justify="space-between" align="center" >
                    <Flex gap={8}>
                        <CustomButton
                            variant="outline"
                            color="cyan"
                            leftSection={<IconFileExport size={24} />}
                            onClick={handleExport}
                        >
                            Tải file mẫu
                        </CustomButton>
                        <FileButton
                            onChange={(fileInput) => {
                                setFileInput(fileInput);
                            }}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                            {(props) =>
                                <CustomButton
                                    variant="outline"
                                    color="blue"
                                    leftSection={<IconFileXFilled size={24} />}
                                    {...props}
                                >
                                    Thêm file
                                </CustomButton>
                            }
                        </FileButton>
                    </Flex>
                    <CustomButton
                        onClick={() => disc[1].close()}
                        leftSection={<IconX size={24} />}
                        variant="outline"
                        color="red">
                        Đóng
                    </CustomButton>
                </Flex>

            </CustomButtonModal>
        </Group >
    )
}
