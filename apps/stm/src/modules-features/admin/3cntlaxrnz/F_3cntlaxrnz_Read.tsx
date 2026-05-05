'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group, Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_3cntlaxrnz_Detail from "./F_3cntlaxrnz_Detail";
import F_3cntlaxrnz_Update from "./F_3cntlaxrnz_Update";

interface IRead {
    id?: number;
    code?: string;
    name?: string;
    gioiTinh?: string;
    ngaySinh?: string;
    ngayThu?: string;
    kenhDong?: string;
    soPhieuThu?: string;
    soTienThu?: number;
    noiDungThu?: string;
    ghiChuDoiSoat?: string;
    soDienThoai?: string;
    email?: string;
    doiSoat: string;
    nguoiDoiSoat: string;
    ngayDoiSoat: string;
}



export default function F_3cntlaxrnz_Read() {
    const [tabValue, setTabValue] = useState('all');

    const TatCaPhieuThuQuery = useQuery({
        queryKey: [`F_3cntlaxrnz_Read`],
        queryFn: async () => {
            return mockData;
        },
    })

    const filteredData = useMemo(() => {
        if (!TatCaPhieuThuQuery.data) return [];
        switch (tabValue) {
            case 'all':
                return TatCaPhieuThuQuery.data;
            case 'complete':
                return TatCaPhieuThuQuery.data.filter(item => item.doiSoat === 'Hoàn thành');
            case 'wrongCustomer':
                return TatCaPhieuThuQuery.data.filter(item => item.doiSoat === 'Sai khách hàng, đúng dịch vụ');
            case 'wrongService':
                return TatCaPhieuThuQuery.data.filter(item => item.doiSoat === 'Đúng khách hàng, sai dịch vụ');
            case 'wrongCustomerAndService':
                return TatCaPhieuThuQuery.data.filter(item => item.doiSoat === 'Sai khách hàng, sai dịch vụ');
            default:
                return TatCaPhieuThuQuery.data;
        }
    }, [tabValue, TatCaPhieuThuQuery.data]);

    const columns = useMemo<MRT_ColumnDef<IRead>[]>(
        () => [
            {
                header: "Mã học viên",
                accessorKey: "code",
            },
            {
                header: "Họ tên",
                accessorKey: "name",
            },
            {
                header: "Giới tính",
                accessorKey: "gioiTinh",
            },
            {
                header: "Ngày sinh",
                accessorKey: "ngaySinh",
                accessorFn(row) {
                    return utils_date_dateToDDMMYYYString(new Date(row.ngaySinh!));
                },
            },
            {
                header: "Ngày thu",
                accessorFn(row) {
                    return utils_date_dateToDDMMYYYString(new Date(row.ngayThu!));
                },
            },
            {
                header: "Kênh đóng",
                accessorKey: "kenhDong",
            },
            {
                header: "Số phiếu thu",
                accessorKey: "soPhieuThu",
            },
            {
                header: "Số tiền thu",
                accessorKey: "soTienThu",
                accessorFn: (row) => row.soTienThu?.toLocaleString('vi-VN'),
            },
            {
                header: "Nội dung thu",
                accessorKey: "noiDungThu",
            },
            {
                header: "Chi tiết thu",
                accessorKey: "chiTietThu",
                accessorFn(row) {
                    return <F_3cntlaxrnz_Detail />
                }
            },
            {
                header: "Ghi chú đối soát",
                accessorKey: "ghiChu",
            },
            {
                header: "Số điện thoại",
                accessorKey: "soDienThoai",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Đối soát",
                accessorKey: "doiSoat",
            },
            {
                header: "Người đối soát",
                accessorKey: "nguoiDoiSoat",
            },
            {
                header: "Ngày đối soát",
                accessorKey: "ngayDoiSoat",
                accessorFn(originalRow) {
                    return originalRow.ngayDoiSoat ?? utils_date_dateToDDMMYYYString(new Date(originalRow.ngayDoiSoat!));
                }
            }
        ],
        []
    );


    const exportConfig = {
        fields: [
            {
                header: "Mã học viên",
                fieldName: "code",
            },
            {
                header: "Họ tên",
                fieldName: "name",
            },
            {
                header: "Giới tính",
                fieldName: "gioiTinh",
            },
            {
                header: "Ngày sinh",
                fieldName: "ngaySinh",
            },
            {
                header: "Ngày thu",
                fieldName: "ngayThu",
            },
            {
                header: "Kênh đóng",
                fieldName: "kenhDong",
            },
            {
                header: "Số phiếu thu",
                fieldName: "soPhieuThu",
            },
            {
                header: "Số tiền thu",
                fieldName: "soTienThu",
            },
            {
                header: "Nội dung thu",
                fieldName: "noiDungThu",
            },
            {
                header: "Chi tiết thu",
                fieldName: "chiTietThu",
            },
            {
                header: "Ghi chú đối soát",
                fieldName: "ghiChu",
            },
            {
                header: "Số điện thoại",
                fieldName: "soDienThoai",
            },
            {
                header: "Email",
                fieldName: "email",
            },
            {
                header: "Đối soát",
                fieldName: "doiSoat",
            },
            {
                header: "Người đối soát",
                fieldName: "nguoiDoiSoat",
            },
            {
                header: "Ngày đối soát",
                fieldName: "ngayDoiSoat",
            }
        ]
    };

    if (TatCaPhieuThuQuery.isLoading) return "Đang tải dữ liệu..."
    if (TatCaPhieuThuQuery.isError) return "Không có dữ liệu..."


    return (
        <MyFieldset title="Danh sách phiếu thu">
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={filteredData}
                renderTopToolbarCustomActions={() => {
                    return <>
                        <MyFlexColumn>
                            <Group>
                                <MyButton color="green">Đối soát bằng file</MyButton>
                                <AQButtonExportData
                                    objectName={"danh-sach-phieu-thu"}
                                    data={filteredData}
                                    exportConfig={exportConfig}
                                />
                            </Group>
                            <Tabs value={tabValue} onChange={(value) => { if (value) { setTabValue(value) } }}>
                                <Tabs.List >
                                    <Tabs.Tab value="all">Tất cả</Tabs.Tab>
                                    <Tabs.Tab value="complete">Hoàn thành</Tabs.Tab>
                                    <Tabs.Tab value="wrongCustomer">Sai khách hàng</Tabs.Tab>
                                    <Tabs.Tab value="wrongService">Sai dịch vụ</Tabs.Tab>
                                    <Tabs.Tab value="wrongCustomerAndService">Sai khách hàng và dịch vụ</Tabs.Tab>
                                </Tabs.List>
                            </Tabs>
                        </MyFlexColumn>
                    </>
                }}
                renderRowActions={() => {
                    return <>
                        <F_3cntlaxrnz_Update />
                    </>
                }}
            />
        </MyFieldset>
    );
}















const mockData: IRead[] = [
    {
        code: "HV0001",
        name: "Nguyễn Văn Năm",
        gioiTinh: "Nam",
        ngaySinh: "1990-01-01",
        ngayThu: "2025-03-15",
        kenhDong: "Chuyển khoản",
        soPhieuThu: "PT00001",
        soTienThu: 1112500,
        noiDungThu: "ToNgocBao-LTW2501",
        ghiChuDoiSoat: "",
        soDienThoai: "0896585235",
        email: "a@gmail.com",
        doiSoat: "Hoàn thành",
        nguoiDoiSoat: "",
        ngayDoiSoat: ""
    },
    {
        code: "HV0002",
        name: "Nguyễn Văn Châu",
        gioiTinh: "Nam",
        ngaySinh: "1990-01-01",
        ngayThu: "2025-03-15",
        kenhDong: "Chuyển khoản",
        soPhieuThu: "PT00002",
        soTienThu: 1112500,
        noiDungThu: "ToNgocBao-LTW2501",
        ghiChuDoiSoat: "",
        soDienThoai: "0896585235",
        email: "a@gmail.com",
        doiSoat: "Đúng khách hàng, sai dịch vụ",
        nguoiDoiSoat: "",
        ngayDoiSoat: ""
    },
    {
        code: "HV0003",
        name: "Nguyễn Văn Bốn",
        gioiTinh: "Nam",
        ngaySinh: "1990-01-01",
        ngayThu: "2025-03-15",
        kenhDong: "Chuyển khoản",
        soPhieuThu: "PT00003",
        soTienThu: 1112500,
        noiDungThu: "ToNgocBao-LTW2501",
        ghiChuDoiSoat: "",
        soDienThoai: "0896585235",
        email: "a@gmail.com",
        doiSoat: "Sai khách hàng, đúng dịch vụ",
        nguoiDoiSoat: "",
        ngayDoiSoat: ""
    },
    {
        code: "HV0004",
        name: "Nguyễn Văn Biển",
        gioiTinh: "Nam",
        ngaySinh: "1990-01-01",
        ngayThu: "2025-03-15",
        kenhDong: "Chuyển khoản",
        soPhieuThu: "PT00004",
        soTienThu: 1112500,
        noiDungThu: "ToNgocBao-LTW2501",
        ghiChuDoiSoat: "",
        soDienThoai: "0896585235",
        email: "a@gmail.com",
        doiSoat: "Sai khách hàng, sai dịch vụ",
        nguoiDoiSoat: "",
        ngayDoiSoat: ""
    }
]