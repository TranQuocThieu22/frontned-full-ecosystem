import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { AQButtonCreateByImportFile, MyButton, MyButtonModal, MyCenterFull, MyDataTable, MyFieldset } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import ReviewTypeCreate from './CreateReviewType';
import StepReviewDelete from './DeleteStepReview';
import UpdateStepReview from './UpdateStepReview';


export interface IInfoViewModel {
    maBuocXetDuyet?: string; // Mã bước xét duyệt
    maQuyTrinhXetDuyet?: string; // Mã quy trình xét duyệt
    thuTu?: number; // Thứ tự
    tenBuocXetDuyet?: string; // Tên bước xét duyệt
    donViPhuTrach?: string; // Đơn vị phụ trách
    loaiTieuChi?: string; // Loại tiêu chí
    thangDiemToiDa?: string; // Thang điểm tối đa
    ghiChu?: string; // Ghi chú
    trangThaiHoSo?: string; // Trạng thái hồ sơ
}

export const mockData: IInfoViewModel[] = [
    {
        maBuocXetDuyet: "BXD001",
        maQuyTrinhXetDuyet: "QTSV-TCB",
        thuTu: 1,
        tenBuocXetDuyet: "Sáng lọc ban đầu",
        donViPhuTrach: "Phòng HTQT",
        loaiTieuChi: "Điểm/Nhận xét",
        thangDiemToiDa: "10",
        ghiChu: "Kiểm tra tính đầy đủ và hợp lệ của hồ sơ.",
        trangThaiHoSo: "Đang sàng lọc",
    },
    {
        maBuocXetDuyet: "BXD002",
        maQuyTrinhXetDuyet: "QTSV-TCB",
        thuTu: 2,
        tenBuocXetDuyet: "Đánh giá chuyên môn Khoa",
        donViPhuTrach: "Khoa/Viện chủ quản",
        loaiTieuChi: "Điểm/Nhận xét",
        thangDiemToiDa: "100",
        ghiChu: "Đánh giá năng lực học thuật và kế hoạch học tập.",
        trangThaiHoSo: "Cho Khoa duyệt",
    },
    {
        maBuocXetDuyet: "BXD003",
        maQuyTrinhXetDuyet: "QTSV-TCB",
        thuTu: 3,
        tenBuocXetDuyet: "Phỏng vấn",
        donViPhuTrach: "Hội đồng tuyển sinh HTQT",
        loaiTieuChi: "Điểm/Nhận xét",
        thangDiemToiDa: "10",
        ghiChu: "Đánh giá kỹ năng mềm, ngoại ngữ, động lực.",
        trangThaiHoSo: "Đang phỏng vấn",
    },
    {
        maBuocXetDuyet: "BXD004",
        maQuyTrinhXetDuyet: "QTSV-TCB",
        thuTu: 4,
        tenBuocXetDuyet: "Phê duyệt cuối cùng",
        donViPhuTrach: "Ban Giám hiệu/Lãnh đạo trường",
        loaiTieuChi: "Quyết định cuối cùng",
        thangDiemToiDa: "N/A",
        ghiChu: "Ra quyết định chấp nhận/từ chối.",
        trangThaiHoSo: "Đang chờ phê duyệt cuối cùng",
    }
]



export default function StepReviewTable() {

    const disclosure = useDisclosure();
    const form_multiple = useForm<any>({
        initialValues: {
        },
    });

    const columns = useMemo<MRT_ColumnDef<IInfoViewModel>[]>(
        () => [
            {
                header: "Mã bước xét duyệt",
                accessorKey: "maBuocXetDuyet",
            },
            {
                header: "Mã quy trình xét duyệt",
                accessorKey: "maQuyTrinhXetDuyet",
            },
            {
                header: "Thứ tự",
                accessorKey: "thuTu",
            },
            {
                header: "Tên bước xét duyệt",
                accessorKey: "tenBuocXetDuyet",
            },
            {
                header: "Đơn vị phụ trách",
                accessorKey: "donViPhuTrach",
            },
            {
                header: "Loại tiêu chí",
                accessorKey: "loaiTieuChi",
            },
            {
                header: "Thang điểm tối đa",
                accessorKey: "thangDiemToiDa",
            },
            {
                header: "Ghi chú",
                accessorKey: "ghiChu",
            },
            {
                header: "Trạng thái hồ sơ",
                accessorKey: "trangThaiHoSo",
            },
        ],
        []
    );

    return (
        <Group>
            <MyButtonModal label="Cập nhật" variant='transparent'
                modalSize={"80%"} disclosure={disclosure}>
                <MyFieldset title={"Danh sách bước xét duyệt"}>
                    <MyDataTable
                        enableRowSelection={false}
                        enableRowNumbers={false}
                        columns={columns}
                        data={mockData}
                        renderTopToolbarCustomActions={({ }) => (
                            <Group>
                                <ReviewTypeCreate />
                                <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                                <MyButton crudType="export" />
                                <MyButton crudType="delete">Xóa</MyButton>
                            </Group>
                        )}
                        renderRowActions={({ row }) => {
                            return (
                                <MyCenterFull>
                                    <UpdateStepReview values={row.original} />
                                    <StepReviewDelete id={0} />
                                </MyCenterFull>
                            );
                        }}
                    />
                </MyFieldset>
            </MyButtonModal>
        </Group>
    )

}