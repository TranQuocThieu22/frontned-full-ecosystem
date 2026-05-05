import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyButton, MyButtonDeleteList, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IThanhLapToThamDinhKinhPhiViewModel } from "./interfaces/ThanhLapToThamDinhKinhPhiViewModel";
import ThanhLapToThamDinhKinhPhiCreate from "./ThanhLapToThamDinhKinhPhiCreate";
import ThanhLapToThamDinhKinhPhiDelete from "./ThanhLapToThamDinhKinhPhiDelete";
import ThanhLapToThamDinhKinhPhiUpdate from "./ThanhLapToThamDinhKinhPhiUpdate";

export default function ThanhLapToThamDinhKinhPhiTable() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
            editorialBoardId: "EB001"
        },
    });
    const columns = useMemo<MRT_ColumnDef<IThanhLapToThamDinhKinhPhiViewModel>[]>(() => [
        { header: "Mã tổ thẩm định", accessorKey: "code" },
        { header: "Tên tổ thẩm định", accessorKey: "name", size: 300 },
        {
            header: "Ngày họp", accessorKey: "meetingDate",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(originalRow.meetingDate)
            },
        },
        { header: "Địa điểm họp", accessorKey: "location" },
        { header: "Thời gian họp", accessorKey: "time" },
        {
            header: "Danh sách thành phần", accessorKey: "members", size: 300, accessorFn: (row) => {
                return row.members.map((member) => {
                    return member + ("; ")
                })
            }
        },
        {
            header: "Danh sách đăng ký tuyển chọn", accessorKey: "registerIds", size: 300, accessorFn: (row) => {
                return row.registerIds.map((registerId) => {
                    return registerId + ("; ")
                })
            }
        },
        {
            header: "File quyết định thành lập tổ", accessorKey: "fileUrl", accessorFn: (row) => {
                return (
                    <MyCenterFull>
                        <MyButtonViewPDF />
                    </MyCenterFull>
                )
            }
        },
        { header: "Trạng thái tổ", accessorKey: "status" }
    ], []);

    const Q_thanhLap = useQuery({
        queryKey: ["ThanhLapToThamDinhKinhPhiTable"],
        queryFn: () => {
            return mockData;
        }
    })

    return (
        <MyFieldset title={"Danh sách hội đồng xét duyệt"}>
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={Q_thanhLap.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <ThanhLapToThamDinhKinhPhiCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <MyButtonDeleteList
                                onSubmit={() => { }}
                                contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.code).join(", ")}
                            />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ThanhLapToThamDinhKinhPhiUpdate data={row.original} />
                            <ThanhLapToThamDinhKinhPhiDelete data={row.original} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyFieldset>
    )
}

export const mockData: IThanhLapToThamDinhKinhPhiViewModel[] = [
    {
        id: 1,
        code: "TTD2025001",
        name: "Tổ thẩm định kinh phí đợt 1/2025",
        meetingDate: "09/05/2025",
        location: "Phòng họp Tài chính",
        time: "09:00 - 11:00",
        members: [
            "NVTC001 - Lê Văn An (Tổ trưởng)",
            "NVTC005 - Trần Thị Bình",
            "NVTC010 - Hoàng Minh Đức"
        ],
        registerIds: ["DKTC2025001", "DKTC2025003", "DKTC2025004"],

        fileUrl: "file_quyetdinh_2025001.pdf",
        status: "Đang thẩm định"
    },
    {
        id: 2,
        code: "TTD2025002",
        name: "Tổ thẩm định kinh phí lĩnh vực CNTT",
        meetingDate: "09/15/2025",
        location: "Google Meet",
        time: "14:00 - 16:30",
        members: [
            "NVTC002 - Nguyễn Thị Mai (Tổ trưởng)",
            "NVTC006 - Bùi Văn Cường"
        ],
        registerIds: ["DKTC2025002", "DKTC2025005"],
        fileUrl: "file_quyetdinh_2025002.pdf",
        status: "Đã thành lập"
    }
];
