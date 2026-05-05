"use client"
import { service_studentsActivityParticipation } from '@/api/services/service_studentsActivityParticipation';
import { FileButton, Grid, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFileExport, IconFileImport, IconFileXFilled, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import * as XLSX from "xlsx";
import { IMandatoryActivitiesEventInfoViewModel, IMandatoryActivitiesInfoViewModel } from './interfaces/IMandatoryActivitiesParticipationViewModel';
import MandatoryActivitiesButtonDelete from './MandatoryActivitiesButtonDelete';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCheckbox } from '@aq-fe/core-ui/shared/components/input/CustomCheckbox';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';


export default function MandatoryActivitiesImportParticipation({ eventValue }: { eventValue: IMandatoryActivitiesEventInfoViewModel }) {
    const [isLoading, setIsLoading] = useState(false);
    const [fileInput, setFileInput] = useState<File | null>(null);

    const disc = useDisclosure();
    const queryClient = useQueryClient();

    const studentEventQuery = useCustomReactQuery({
        queryKey: ["MandatoryActivitiesImportParticipation_GetBy", eventValue.id],
        axiosFn: () => service_studentsActivityParticipation.getBy(
            `?eventid=${eventValue.id}`
        ),
        options: {
            enabled: disc[0],
        },
    });

    useEffect(() => {
        if (studentEventQuery.isSuccess) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [studentEventQuery]);


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

    const ENDPOINT = 'Event/ImportParticipate'

    const importFileMutate = useMutation(
        {
            mutationFn: async (fileData: any[]) => {
                const params = `?eventId=${eventValue.id}`;
                const response = await axiosInstance.post(`${ENDPOINT}${params}`, fileData);

                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries();
                setIsLoading(false);
            },
        }
    );

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

                    return;
                }

                if (validData.length > 0) {
                    importFileMutate.mutate(validData);
                }
            }
        };

        reader.readAsArrayBuffer(fileInput);
    }, [fileInput])

    const columns = useMemo<MRT_ColumnDef<IMandatoryActivitiesInfoViewModel>[]>(() => [
        { header: "Họ và tên", accessorKey: "studentName", },
        {
            header: "Điểm", accessorKey: "point", size: 80,
            accessorFn: (row) =>
                <CustomCenterFull>
                    <Text> {row.point}</Text>
                </CustomCenterFull>
        },
        {
            header: "Tham gia", accessorKey: "isRegistration", size: 80,
            accessorFn: (row) =>
                <CustomCenterFull>
                    <CustomCheckbox
                        checked={row.isRegistration}
                        readOnly
                    />
                </CustomCenterFull>
        }
    ], [])

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
                    children: <IconFileImport color="#0dcaf0" style={{ background: 'transparent' }} />

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
                    data={isLoading ? [] : (studentEventQuery.data || [])}

                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                <MandatoryActivitiesButtonDelete id={row.original!.id!} name={row.original!.studentName!} />
                            </CustomCenterFull>
                        )
                    }}
                />
                <Grid align="flex-start">
                    <Grid.Col span={{ base: 12, sm: 3, lg: 1.8 }}>
                        <CustomButton
                            variant="outline"
                            color="cyan"
                            leftSection={<IconFileExport size={24} />}
                            onClick={handleExport}
                        >
                            Tải file mẫu
                        </CustomButton>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 3, lg: 2 }}>
                        <FileButton
                            onChange={(fileInput) => {
                                setFileInput(fileInput);
                            }}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                            {(props) =>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <CustomButton
                                        variant="outline"
                                        color="blue"
                                        leftSection={<IconFileXFilled size={24} />}
                                        {...props}
                                    >
                                        Thêm file
                                    </CustomButton>
                                </div>
                            }
                        </FileButton>

                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, lg: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CustomButton
                                onClick={() => disc[1].close()}
                                leftSection={<IconX size={24} />}
                                variant="outline"
                                color="red">
                                Đóng
                            </CustomButton>
                        </div>
                    </Grid.Col>
                </Grid>
            </CustomButtonModal>
        </Group>
    )
}
