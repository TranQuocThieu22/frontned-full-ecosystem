'use client'

import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { utils_pdf_download } from "@/utils/pdf";
import { useQuery } from "@tanstack/react-query";
import { ActionIcon, Center, Group, Modal, Paper, Text, Tooltip, useModalsStack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload, IconLivePhoto, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useMemo, useState } from "react";

interface IRegisteredExaminationViewModel {
    id?: number;
    name?: string;
    gender?: string;
    dateOfBirth?: Date | undefined;
    examCode?: string;
    exameName?: string;
    examDate?: Date | undefined;
    email?: string;
    phoneNumber?: string;
    CCCD?: string;
    CCCD_DateOfIssue?: Date | undefined;
    CCCD_PlaceOfIssue?: string;
    receiptFile?: File | undefined;
    payment?: number;
    studentType?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

function PdfViewButton({ pdfLink }: { pdfLink: string }) {
    const disc = useDisclosure(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [hSize, setHSize] = useState("80vh");
    return (
        <>
            <Tooltip label="Xem tài liệu trực tiếp">
                <ActionIcon color="cyan" onClick={disc[1].open}>
                    <IconLivePhoto />
                </ActionIcon>
            </Tooltip>
            <Modal
                fullScreen={fullScreen}
                opened={disc[0]}
                onClose={disc[1].close}
                size="80%"
                title={
                    <Group>
                        <Text>Xem tài liệu trực tiếp</Text>
                        {fullScreen ? (
                            <ActionIcon onClick={() => { setFullScreen(false); setHSize("80vh"); }}>
                                <IconMinimize />
                            </ActionIcon>
                        ) : (
                            <ActionIcon onClick={() => { setFullScreen(true); setHSize("90vh"); }}>
                                <IconMaximize />
                            </ActionIcon>
                        )}
                    </Group>
                }
            >
                <Paper h={hSize} p="lg">
                    <iframe src={pdfLink} width="100%" height="100%" />
                </Paper>
            </Modal>
        </>
    );
}

function PdfDownloadButton({ pdfLink }: { pdfLink: string }) {
    return (
        <Tooltip label="Nhấp để tải xuống">
            <ActionIcon onClick={async () => await utils_pdf_download(pdfLink)} color="red">
                <IconDownload />
            </ActionIcon>
        </Tooltip>
    );
}

const mockData: IRegisteredExaminationViewModel[] = [
    {
        id: 1, name: "Nguyễn Văn A", gender: "Nam", dateOfBirth: new Date("1990-01-01T00:00:00Z"),
        examCode: "KT001", exameName: "Toán cao cấp", examDate: new Date("2023-12-01T00:00:00Z"),
        email: "nguyenvana@example.com", phoneNumber: "0123456789", CCCD: "123456789",
        CCCD_DateOfIssue: new Date("2010-01-01T00:00:00Z"), CCCD_PlaceOfIssue: "Hà Nội",
        payment: 1000000, studentType: "Sinh viên", nguoiCapNhat: "Nguyễn Văn A", ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 2, name: "Trần Thị B", gender: "Nữ", dateOfBirth: new Date("1992-02-02T00:00:00Z"),
        examCode: "KT002", exameName: "Vật lý đại cương", examDate: new Date("2023-12-02T00:00:00Z"),
        email: "tranthib@example.com", phoneNumber: "0987654321", CCCD: "987654321",
        CCCD_DateOfIssue: new Date("2012-02-02T00:00:00Z"), CCCD_PlaceOfIssue: "Hồ Chí Minh",
        payment: 2000000, studentType: "Sinh viên", nguoiCapNhat: "Nguyễn Văn A", ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 3, name: "Lê Văn C", gender: "Nam", dateOfBirth: new Date("1994-03-03T00:00:00Z"),
        examCode: "KT003", exameName: "Hóa học đại cương", examDate: new Date("2023-12-03T00:00:00Z"),
        email: "levanc@example.com", phoneNumber: "0123987654", CCCD: "456789123",
        CCCD_DateOfIssue: new Date("2014-03-03T00:00:00Z"), CCCD_PlaceOfIssue: "Đà Nẵng",
        payment: 1500000, studentType: "Tự do", nguoiCapNhat: "Nguyễn Văn A", ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
];

export default function CandidateListTable() {
    const query = useQuery<IRegisteredExaminationViewModel[]>({
        queryKey: [`CandidateListTable`],
        queryFn: async () => mockData,
    })

    const columns = useMemo<CustomColumnDef<IRegisteredExaminationViewModel>[]>(() => [
        { header: "Họ tên", accessorKey: "name" },
        { header: "Giới tính", accessorKey: "gender" },
        {
            header: "Ngày sinh", accessorKey: "dateOfBirth",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.dateOfBirth!));
            },
        },
        { header: "Mã khóa thi", accessorKey: "examCode" },
        { header: "Tên khóa thi", accessorKey: "exameName" },
        {
            header: "Ngày thi", accessorKey: "examDate",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.examDate!));
            },
        },
        { header: "Email", accessorKey: "email" },
        { header: "Số điện thoại", accessorKey: "phoneNumber" },
        { header: "CCCD", accessorKey: "CCCD" },
        {
            header: "Ngày cấp CCCD", accessorKey: "CCCD_DateOfIssue",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.CCCD_DateOfIssue!));
            },
        },
        { header: "Nơi cấp CCCD", accessorKey: "CCCD_PlaceOfIssue" },
        {
            header: "Phiếu thu",
            id: "receiptFile",
            accessorFn: () => (
                <Center>
                    <PdfViewButton pdfLink="https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf" />
                    <PdfDownloadButton pdfLink="https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf" />
                </Center>
            )
        },
        { header: "Số tiền đã thu", accessorKey: "payment" },
        { header: "Đối tượng", accessorKey: "studentType" },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật", accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"

    return (
        <CustomDataTable
            columns={columns}
            data={query.data!}
        />
    )
}
