"use client";
import { Center, Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconFile, IconInfoCircle, IconPlus, IconUsers } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { MyActionIconUpdate, MyButton, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { IApprovalForUseInfoViewModel } from './ApprovalForUseRead';
import ListOfElectronicLecturesDelete from './ListOfElectronicLecturesDelete';
import { mockDataElectronicLectures } from './mockData';


export interface IElectronicLecturesInfoViewModel {
    maBanThao?: string; // Mã Bản thảo
    tenGiaoTrinhDeXuat?: string; // Tên Giáo trình Đề xuất
    chuBienBanBienSoan?: string; // Chủ biên/Ban Biên soạn
}

export default function ApprovalForUseReadUpdate({ values }: { values: IApprovalForUseInfoViewModel }) {
    const form = useForm<IApprovalForUseInfoViewModel>({
        initialValues: { ...values }
    })
    const queryElectronicLectures = useQuery<IElectronicLecturesInfoViewModel[]>({
        queryKey: ["ElectronicLectures"],
        queryFn: async () => mockDataElectronicLectures
    });

    const columns = useMemo<MRT_ColumnDef<IElectronicLecturesInfoViewModel>[]>(() => [
        {
            header: "Mã bản thảo",
            accessorKey: "maBanThao",
            Cell: ({ cell }) => (
                <MySelect
                    data={["BT002", "BT003", "BT004", "BT007"]} defaultValue={cell.getValue<string>()} />
            )
        },
        {
            header: "Tên Giáo trình Đề xuất",
            accessorKey: "tenGiaoTrinhDeXuat",
            Cell: ({ cell }) => (
                <MyTextInput
                    defaultValue={cell.getValue<string>()}
                    readOnly
                    variant='unstyled'
                />
            )
        },
        {
            header: "Chủ biên Ban Biên soạn",
            accessorKey: "chuBienBanBienSoan",
            Cell: ({ cell }) => (
                <MyTextInput
                    defaultValue={cell.getValue<string>()}
                    readOnly
                    variant='unstyled'
                />
            )
        },
    ], []);

    return (
        <Group>
            <MyActionIconUpdate
                title="Chi tiết phê duyệt chính thức"
                form={form}
                onSubmit={() => {
                }}
                modalSize={"70%"}
            >
                <Tabs defaultValue="tab1" >
                    <Tabs.List >
                        <Tabs.Tab
                        bg="rgba(131, 204, 235, 0.3)"
                        color="rgba(131, 204, 235, 1)"
                        flex={1}
                        leftSection={<IconInfoCircle/>}
                        value="tab1" >Thông tin chung</Tabs.Tab>
                        <Tabs.Tab 
                        bg="rgba(247, 216, 54, 0.3)"
                        color="rgba(247, 216, 54, 1)"
                        flex={1}
                        leftSection={<IconFile/>}
                        value="tab2" >Danh sách bài giảng điện tử</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="tab1">
                        <SimpleGrid p="md" cols={2}>
                            <Stack>
                                <MyTextInput label="Số quyết định/ Văn bản ban hành" {...form.getInputProps("soQuyetDinh")} />
                                <MyTextInput label="Tên Quyết định" {...form.getInputProps("")} />
                                <MyFileInput label="File quyết định/ Văn bản ban hành" {...form.getInputProps("fileQuyetDinh")} />
                                <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
                            </Stack>
                            <Stack>
                                <MyDateInput label="Ngày Ban hành Quyết định" {...form.getInputProps("ngayQuyetDinh")} />
                                <MyTextInput label="Người ký duyệt/Ban hành quyết định" {...form.getInputProps("nguoiKyQuyetDinh")} />
                            </Stack>
                        </SimpleGrid>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <MyDataTable
                            enableRowSelection={true}
                            enableRowNumbers={false}
                            columns={columns}
                            data={queryElectronicLectures.data || []}
                            renderTopToolbarCustomActions={({ }) => (
                                <Group>
                                    <MyButton crudType="default" leftSection={<IconPlus />} variant='outline' color='blue' onSubmit={() => { }}>Thêm</MyButton>
                                </Group>
                            )}
                        />
                    </Tabs.Panel>
                </Tabs>
            </MyActionIconUpdate>
        </Group>
    );
}
