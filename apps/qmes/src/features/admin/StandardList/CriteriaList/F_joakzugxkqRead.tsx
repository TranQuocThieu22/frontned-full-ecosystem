'use client'
import { MyDataTable } from '@/components/ui/DataDisplay/DataTable/MyDataTable';
import { Button, Group, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { AQButtonCreateByImportFile } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import F_joakzugxkqCreate from './F_joakzugxkqCreate';
import F_joakzugxkqCreateTchi from './F_joakzugxkqCreateTC';
import F_joakzugxkqDelete from './F_joakzugxkqDelete';
import F_joakzugxkqUpdate from './F_joakzugxkqUpdate';
import F_joakzugxkqUpdateTChi from './F_joakzugxkqUpdateTChi';
interface ICreateUserViewModel {
    id?: number;
    maTieuChuan?: string;
    tenTieuChuan?: string;
    tenTieuChuanEg?: string;
    ghiChu?: string;
    thaoTac?: string;
}

export interface I_joakzugxkqRead {
    id?: number,
    maTieuChuan?: string,
    tenTieuChuan?: string,
    maTieuChi?: string,
    tenTieuChi?: string,
}

export default function F_joakzugxkqRead(
) {
    const columns = useMemo<MRT_ColumnDef<ICreateUserViewModel>[]>(
        () => [
            {
                header: "Mã Tiêu Chuẩn",
                accessorKey: "maTieuChuan"
            },
            {
                header: "Tên Tiêu Chuẩn",
                accessorKey: "tenTieuChuan"
            },
            {
                header: "Tên tiêu chuẩn Eg",
                accessorKey: "tenTieuChuanEg"
            },
            {
                header: "Ghi Chú",
                accessorKey: "ghiChu",

            },
        ],
        []
    );

    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {

        },
    })

    const AllUniversityLecturerAndExpertQuery = useQuery<ICreateUserViewModel[]>({
        queryKey: [`F_joakzugxkqRead`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const AllUserQuery = useQuery<I_joakzugxkqRead[]>({
        queryKey: ["I_joakzugxkqRead"],
        queryFn: async () => data,
    });
    const columnsTC = useMemo<MRT_ColumnDef<I_joakzugxkqRead>[]>(
        () => [
            {
                header: "Mã Tiêu Chuẩn",
                accessorKey: "maTieuChuan"
            },
            {
                header: "Mã Tiêu Chí",
                accessorKey: "maTieuChi"
            },
            {
                header: "Tên tiêu chí",
                accessorKey: "tenTieuChi",

            },


        ],
        []
    );
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu..."
    return (
        <Tabs defaultValue="Danh sách tiêu chuẩn" >
            <Tabs.List>
                <Tabs.Tab value="Danh sách tiêu chuẩn">
                    Danh sách tiêu chuẩn
                </Tabs.Tab>
                <Tabs.Tab value="Danh sách tiêu chí">
                    Danh sách tiêu chí
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="Danh sách tiêu chuẩn">
                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    setSelectedRow={setSelectedRows}
                    data={AllUniversityLecturerAndExpertQuery.data || []}
                    renderTopToolbarCustomActions={() => {
                        return (<Group>
                            <F_joakzugxkqCreate />
                            <AQButtonCreateByImportFile setImportedData={(data) => console.log("Imported Data:", data)} onSubmit={() => { }} form={form_multiple} />
                            <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                        </Group>)
                    }} renderRowActions={({ row }) => {
                        return (
                            <Group>
                                <F_joakzugxkqUpdate values={row.original} />
                                <F_joakzugxkqDelete id={row.original.id!} maTieuChuan={row.original.maTieuChuan!} />
                            </Group>
                        )
                    }}
                />
            </Tabs.Panel>
            <Tabs.Panel value="Danh sách tiêu chí">
                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    columns={columnsTC}
                    enableRowNumbers={true}
                    setSelectedRow={setSelectedRows}
                    data={AllUserQuery.data || []}
                    renderTopToolbarCustomActions={() => {
                        return (<Group >
                            <F_joakzugxkqCreateTchi />
                            <AQButtonCreateByImportFile setImportedData={(data) => console.log("Imported Data:", data)} onSubmit={() => { }} form={form_multiple} />
                            <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                        </Group>)
                    }} renderRowActions={({ row }) => {
                        return (
                            <Group>
                                <F_joakzugxkqUpdateTChi values={row.original} />
                                <F_joakzugxkqDelete id={row.original.id!} maTieuChuan={row.original.maTieuChuan!} />
                            </Group>
                        )
                    }}
                />
            </Tabs.Panel>
        </Tabs>

    )
}

const mockData: ICreateUserViewModel[] = [
    {
        id: 1,
        maTieuChuan: "TC01",
        tenTieuChuan: "Tổ chức và quản trị",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 2,
        maTieuChuan: "TC02",
        tenTieuChuan: "Giảng viên",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 3,
        maTieuChuan: "TC03",
        tenTieuChuan: "Cơ sở vật chất",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 4,
        maTieuChuan: "TC04",
        tenTieuChuan: "Tài chính",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 5,
        maTieuChuan: "TC05",
        tenTieuChuan: "Tuyển sinh và đào tạo",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 6,
        maTieuChuan: "TC06",
        tenTieuChuan: "Nghiên cứu và đổi mới sáng tạo",
        tenTieuChuanEg: "",
        ghiChu: "",

    },
    {
        id: 7,
        maTieuChuan: "TC07",
        tenTieuChuan: "Phục vụ khảo sát người học",
        tenTieuChuanEg: "",
        ghiChu: "",

    }
];
const data: I_joakzugxkqRead[] = [
    {
        id: 1,
        maTieuChuan: "TC01",
        tenTieuChuan: "Tổ chức và quản trị",
        maTieuChi: "TC1.1",
        tenTieuChi: "Lãnh đạo không khuyết đồng thời 2 vị trí",

    },
    {
        id: 2,
        maTieuChuan: "TC02",
        tenTieuChuan: "Giảng viên",
        maTieuChi: "TC1.2",
        tenTieuChi: "Giảng viên có đủ năng lực chuyên môn",

    },
    {
        id: 3,
        maTieuChuan: "TC03",
        tenTieuChuan: "Cơ sở vật chất",
        maTieuChi: "TC1.3",
        tenTieuChi: "Cơ sở vật chất đáp ứng yêu cầu đào tạo",

    },
    {
        id: 4,
        maTieuChuan: "TC04",
        tenTieuChuan: "Tài chính",
        maTieuChi: "TC1.4",
        tenTieuChi: "Tài chính minh bạch và bền vững",

    },
    {
        id: 5,
        maTieuChuan: "TC05",
        tenTieuChuan: "Tuyển sinh và đào tạo",
        maTieuChi: "TC1.5",
        tenTieuChi: "Tuyển sinh đảm bảo chất lượng",

    },
    {
        id: 6,
        maTieuChuan: "TC06",
        tenTieuChuan: "Nghiên cứu và đổi mới sáng tạo",
        maTieuChi: "TC1.6",
        tenTieuChi: "Nghiên cứu khoa học có ứng dụng thực tiễn",

    },
    {
        id: 7,
        maTieuChuan: "TC07",
        tenTieuChuan: "Phục vụ khảo sát người học",
        maTieuChi: "TC1.7",
        tenTieuChi: "Khảo sát người học định kỳ",

    }
];