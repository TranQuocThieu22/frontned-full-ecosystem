'use client'
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import Delete_paymentRequest from "./Delete_paymentRequest";
import PaymentRequestCreate from "./PaymentRequestCreate";
import Update_paymentRequest from "./Update_paymentRequest";

export interface IPaymentRequest {
    paymentCode: string; // Mã đề nghị thanh toán
    paymentName: string; // Tên đề nghị
    paymentObject: string; // Đối tượng thanh toán
    paymentDate: string; // Ngày lập đề nghị
    paymentDetail: string; // Danh sách cá nhân và chi tiết thù lao
    paymentAmount: string; // Tổng số tiền đề nghị thanh toán
    paymentFile: string; // Tài liệu/Minh chứng đính kèm
    paymentStatus: string; // Trạng thái đề nghị
    paymentNote: string; // Ghi chú của người lập đề nghị
}

export default function Read_paymentRequest() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    // Query to fetch mock data
    const query = useQuery<IPaymentRequest[]>({
        queryKey: ["PaymentRequestRead"],
        queryFn: async () => mockData
    });

    const columns = useMemo<MRT_ColumnDef<IPaymentRequest>[]>(() => [
        { header: "Mã đề nghị thanh toán", accessorKey: "paymentCode" },
        { header: "Tên đề nghị", accessorKey: "paymentName" },
        { header: "Đối tượng thanh toán", accessorKey: "paymentObject" },
        { header: "Ngày lập đề nghị", accessorKey: "paymentDate" },
        { header: "Danh sách cá nhân và chi tiết thù lao", accessorKey: "paymentDetail" },
        { header: "Tổng số tiền đề nghị thanh toán", accessorKey: "paymentAmount" },
        { header: "Tài liệu/Minh chứng đính kèm", accessorKey: "paymentFile", Cell: ({ cell }) => <MyButtonViewPDF label="Xem file" /> },
        { header: "Trạng thái đề nghị", accessorKey: "paymentStatus" },
        { header: "Ghi chú của người lập đề nghị", accessorKey: "paymentNote" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "paymentCode", header: "Mã đề nghị thanh toán" },
            { fieldName: "paymentName", header: "Tên đề nghị" },
            { fieldName: "paymentObject", header: "Đối tượng thanh toán" },
            { fieldName: "paymentDate", header: "Ngày lập đề nghị" },
            { fieldName: "paymentDetail", header: "Danh sách cá nhân và chi tiết thù lao" },
            { fieldName: "paymentAmount", header: "Tổng số tiền đề nghị thanh toán" },
            { fieldName: "paymentFile", header: "Tài liệu/Minh chứng đính kèm" },
            { fieldName: "paymentStatus", header: "Trạng thái đề nghị" },
            { fieldName: "paymentNote", header: "Ghi chú của người lập đề nghị" },
        ],
    };

    if (query.isLoading) return "Loading...";
    if (query.isError) return 'Không có dữ liệu...';

    return (
        <MyFieldset title={"Danh sách đề nghị thanh toán"}>
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <PaymentRequestCreate/>
                            <AQButtonCreateByImportFile
                                form={form_multiple}
                                onSubmit={() => {}}
                            />
                            <AQButtonExportData
                                
                                objectName="dsPaymentRequest"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <MyButton crudType="delete" onSubmit={() => { }}>Xóa</MyButton>
                        </Group>
                    )}
                    initialState={{
                        columnPinning: { right: ['mrt-row-actions'] },
                        columnVisibility: {
                            paymentNote: true,
                        }
                    }}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <Update_paymentRequest data={row.original} />
                            <Delete_paymentRequest paymentCode={row.original.paymentCode} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: IPaymentRequest[] = [
    {
        paymentCode: "DNTT-BKDH-001",
        paymentName: "Đề nghị thanh toán thù lao biên soạn CTĐT Khoa học Dữ liệu",
        paymentObject: "Ban Biên soạn CTĐT Khoa học Dữ liệu",
        paymentDate: "2025-05-27",
        paymentDetail: "TS. Nguyễn Văn A: Thù lao biên soạn 2.500.000 VND. Ban soạn module cơ sở ngành, TS. Lê Thái Thành: 1.500.000 VND. Biên soạn môn chuyên ngành. PGS.TS Trần Văn C: 1.000.000 VND. Chỉnh sửa chi tiết.",
        paymentAmount: "5.500.000 VND",
        paymentFile: "Xem file",
        paymentStatus: "Chờ duyệt",
        paymentNote: "Đã kiểm tra đủ minh chứng, thù lao theo nội dung và trả đủ."
    },
    {
        paymentCode: "DNTT-LG-002",
        paymentName: "Đề nghị thanh toán thù lao thẩm định CTĐT ngành Logistics",
        paymentObject: "Hội đồng Thẩm định CTĐT ngành Logistics",
        paymentDate: "2025-06-25",
        paymentDetail: "TS. Hoàng Thị D: Thù lao biên soạn 2.000.000 VND. Phần biên soạn, sửa chương trình. PGS.TS Lê Văn E: Thù lao phản biện 1.500.000 VND. Phản biện chuyên môn. ThS. Phạm Văn T: Thư ký phản biện 1.000.000 VND. Đóng góp báo cáo thực hành.",
        paymentAmount: "5.500.000 VND",
        paymentFile: "Xem file",
        paymentStatus: "Đã phê duyệt",
        paymentNote: "Đã chuyển Phòng Kế toán xử lý."
    },
];