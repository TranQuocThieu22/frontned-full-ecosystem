import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ReviewTypeCreate from "./CreateReviewType";
import ReviewTypeDelete from "./DeleteReviewType";
import StepReviewTable from "./ReadStepReview";
import ReviewTypeUpdate from "./UpdateReviewType";

export interface IInfoViewModel {
    id: number;
    maQuyTrinh?: string; // Mã quy trình
    tenQuyTrinh?: string; // Tên quy trình
    ghiChu?: string; // Ghi chú
}


export default function ReviewTypeLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
        },
    });

    const columns = useMemo<MRT_ColumnDef<IInfoViewModel>[]>(
        () => [
            {
                header: "Mã quy trình",
                accessorKey: "maQuyTrinh",
            },
            {
                header: "Tên quy trình",
                accessorKey: "tenQuyTrinh",
            },
            {
                header: "Ghi chú",
                accessorKey: "ghiChu",
            },
            {
                header: "Trình tự xử lý",
                accessorFn: row => <MyCenterFull><StepReviewTable /></MyCenterFull>
            },
        ],
        []
    );


    return (
        <MyFieldset title="Danh sách quy trình xét duyệt">
            <MyDataTable
                columns={columns}
                enableRowNumbers={false}
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <ReviewTypeCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    );
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ReviewTypeUpdate values={row.original} />
                            <ReviewTypeDelete id={row.original.id || 0} />
                        </MyCenterFull>
                    );
                }} />
        </MyFieldset>
    )
}

export const mockData: IInfoViewModel[] = [
    {
        id: 1,
        maQuyTrinh: "QTSV-TCB",
        tenQuyTrinh: "Quy trình SV Trao đổi (Tiêu chuẩn)",
        ghiChu: "Quy trình xét duyệt tiêu chuẩn cho các chương trình trao đổi sinh viên thông thường, bao gồm sáng lọc, đánh giá khoa và phỏng vấn.",
    },
    {
        id: 2,
        maQuyTrinh: "QTGV-NC",
        tenQuyTrinh: "Quy trình GV Nghiên cứu",
        ghiChu: "Quy trình xét duyệt cho giảng viên đi nghiên cứu, nhận mạnh đề xuất nghiên cứu và kinh nghiệm.",
    },
    {
        id: 3,
        maQuyTrinh: "QTHB-TOANPHAN",
        tenQuyTrinh: "Quy trình Học bổng Toán phản",
        ghiChu: "Quy trình chuyên sâu cho học bổng toán phản, có thêm vòng đánh giá tài chính và kiểm tra sức khỏe.",
    },
    {
        id: 4,
        maQuyTrinh: "QT_INBOUND",
        tenQuyTrinh: "Quy trình Trao đổi Đến (Inbound)",
        ghiChu: "Quy trình xét duyệt hồ sơ sinh viên/giảng viên từ đối tác gửi đến trường.",
    }
]