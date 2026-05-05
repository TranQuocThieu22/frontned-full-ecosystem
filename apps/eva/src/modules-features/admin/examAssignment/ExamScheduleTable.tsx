'use client'
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { Button, Flex, Group, Modal, Select, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CandidatesListModal from "./CandidatesListModal";
import ExamPaperListModal from "./ExamPaperListModal";
import { IExamScheduleInfoViewModel } from "./interfaces/InfoInterface";

export default function ExamScheduleTable() {
    const discAssignExamPaperForMultipleExamSchedule = useDisclosure(false);
    const discAssignExamPaperForIndividualExamSchedule = useDisclosure(false);

    const queryExamSchedule = useQuery<IExamScheduleInfoViewModel[]>({
        queryKey: ["ExamScheduleAssignmentRead"],
        queryFn: () => {
            return mockData || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<IExamScheduleInfoViewModel>[]>(() => [
        { header: "Mã môn học", accessorKey: "maMonHoc" },
        { header: "Tên môn học", accessorKey: "tenMonHoc" },
        { header: "Nhóm thi", accessorKey: "nhomThi" },
        { header: "Ngày thi", accessorKey: "ngayThi" },
        { header: "Giờ bắt đầu", accessorKey: "gioBatDau" },
        { header: "Thời gian thi", accessorKey: "thoiGianThi" },
        { header: "Quy tắc làm tròn điểm", accessorKey: "quyTacLamTronDiem" },
        { header: "Ghi chú", accessorKey: "ghiChu" },
        {
            header: "Số lượng", accessorKey: "soLuong",
            accessorFn: (row) => {
                return <CandidatesListModal data={row} />;
            },
        },
        { header: "Trạng thái", accessorKey: "trangThai" },
        { header: "Phụ trách", accessorKey: "phuTrach" },
        {
            header: "Mã đề chuẩn", accessorKey: "maDeChuan",
            accessorFn: (row) => {
                return <div onClick={() => {
                    discAssignExamPaperForIndividualExamSchedule[1].open();
                }} >
                    <CustomSelect
                        data={[
                            { value: "1", label: "564" },
                            { value: "2", label: "566" },
                            { value: "3", label: "125" },
                        ]}
                        value={row.maDeChuan ?? null}
                        clearable={false}
                    />
                </div>
            }
        },
    ], []);

    return (
        <MyFlexColumn>
            <Flex direction={"column"}>
                <Group>
                    <CustomSelect
                        w={{ base: "100%", md: "45%" }}
                        label="Chọn kỳ thi"
                        data={[
                            { value: '1', label: '2024T1D1 - Thi cuối kỳ Đợt 1 năm học 2024 - học kỳ 1' },
                            { value: "2", label: "2024T1D2 - Thi cuối học kỳ Đợt 2 năm học 2024 - học kỳ 1" },
                        ]}
                        value={"1"}
                        clearable={false}
                    />
                    <Group
                        mt={{ base: 0, md: 20 }}
                        w={{ base: "100%", md: "45%" }}
                    >
                        <Text size="sm">Ngày bắt đầu: 15/12/2024</Text>
                        <Text size="sm">Ngày kết thúc: 28/12/2024</Text>
                    </Group>
                </Group>
                <Group mt={12}>
                    <Flex direction={"column"}>
                        <Text fw="500" size="sm">Trạng thái</Text>
                        <Group gap={32} mt={4}>
                            <Tabs variant="pills" defaultValue="1"
                                style={{ border: '1px solid #cccc', borderRadius: '4px', overflow: 'hidden' }}
                            >
                                <Tabs.List style={{ gap: 0 }} bg="white">
                                    <Tabs.Tab style={{ borderRight: '1px solid #cccc' }} value="1">Sắp diễn ra</Tabs.Tab>
                                    <Tabs.Tab style={{ borderRight: '1px solid #cccc' }} value="2">Đang diễn ra</Tabs.Tab>
                                    <Tabs.Tab style={{ borderRight: '1px solid #cccc' }} value="3">Đã kết thúc</Tabs.Tab>
                                    <Tabs.Tab value="4">Tất cả</Tabs.Tab>
                                </Tabs.List>
                            </Tabs>
                        </Group>
                    </Flex>
                </Group>
            </Flex>

            <MyFieldset title={`Danh sách ca thi`}>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <MyButton color="teal" >Export</MyButton>
                            <Button
                                color="orange"
                                onClick={() => discAssignExamPaperForMultipleExamSchedule[1].open()}
                            >
                                Gán đề chuẩn chung
                            </Button>
                            <Button color="blue">Lưu</Button>
                        </Group>
                    )}
                    columns={columns}
                    data={queryExamSchedule.data || []}
                />
            </MyFieldset>
            <ExamPaperListModal
                dis={discAssignExamPaperForIndividualExamSchedule}
            />
            <Modal
                size={"lg"}
                opened={discAssignExamPaperForMultipleExamSchedule[0]}
                onClose={discAssignExamPaperForMultipleExamSchedule[1].close}
                title="Gán mã đề thi">
                <>
                    <Flex
                        direction="column"
                    >
                        <Group
                            w={"100%"}
                            align="start"
                            justify="space-between"
                        >
                            <Select
                                label="Chọn mã đề chuẩn"
                                placeholder="chọn mã đề chuẩn"
                                data={[
                                    { value: '1', label: '564, Đề thi Cơ sở dữ liệu học kỳ 1 - 2024' },
                                    { value: '2', label: '566, Đề thi Cơ sở dữ liệu học kỳ 1 - 2025' },
                                    { value: '3', label: '125, Đề thi Toán cao cấp học kỳ 1 - 2024' },
                                ]}
                                defaultValue={"1"}
                                clearable
                                w={{ base: "100%" }}
                            />
                            <Button
                                w={"100%"}
                                color="blue" onClick={() => discAssignExamPaperForMultipleExamSchedule[1].close()}>
                                Lưu
                            </Button>
                        </Group>
                    </Flex>
                </>
            </Modal>
        </MyFlexColumn>
    );
}

const mockData: IExamScheduleInfoViewModel[] = [
    {
        id: 1,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room1",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "Tô Ngọc Anh",
        maDeChuan: "1"
    },
    {
        id: 2,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room2",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "Tô Ngọc Anh",
        maDeChuan: "1"
    },
    {
        id: 3,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room3",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "Tô Ngọc Anh",
        maDeChuan: "2"
    },
    {
        id: 4,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room4",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Đã kết thúc",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "Tô Ngọc Anh",
        maDeChuan: "2"
    },
    {
        id: 5,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room5",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Đang diễn ra",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "",
        maDeChuan: "2"
    },
    {
        id: 6,
        maMonHoc: "TCC",
        tenMonHoc: "Toán cao cấp",
        nhomThi: "room5",
        ngayThi: "25/06/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
        phuTrach: "Tô Ngọc Lan",
        soCauCanCham: 20,
        soCauDaCham: 9,
        soCauChuaCham: 11,
        giamKhao: "Tô Ngọc Anh",
        maDeChuan: "3"
    }
];