import { Center, Checkbox } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { AQButtonExportData, MyButton, MyButtonModal, MyCenterFull, MyDataTable, MyFieldset } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import React, { useMemo } from 'react'
import { QLCLStatusBadge, QLCLStatusMap } from './QLCLStatus';
import { useDisclosure } from '@mantine/hooks';
import { StudentStatusBadge, StudentStatusMap } from './studentStatus';

export default function MonthlyParentFeedbackDetailTable() {
    const disc = useDisclosure()

    const query = useQuery<IStudentReport[]>({
        queryKey: ["IStudentReportQuery"],
        queryFn: async () => {
            return mockData || [];
        },
    })

    const columns = useMemo<MRT_ColumnDef<IStudentReport>[]>(() => [
        { header: "Mã học sinh", accessorKey: "studentCode" },
        { header: "Họ và tên HS", accessorKey: "studentName" },
        { header: "SĐT Phụ huynh", accessorKey: "parentPhone" },
        {
            header: "Trạng thái học",
            id: "status",
            size: 250,
            accessorFn: row => <Center><StudentStatusBadge result={StudentStatusMap[row.status || -1]?? -1} /></Center>
        },
        { header: "Ghi chú chung HS", accessorKey: "studentNote" },
        { header: "BTVN1", accessorKey: "btvn1" },
        { header: "BTVN2", accessorKey: "btvn2" },
        { header: "BTVN3", accessorKey: "btvn3" },
        { header: "BTVN4", accessorKey: "btvn4" },
        { header: "BTVN5", accessorKey: "btvn5" },
        { header: "BTVN6", accessorKey: "btvn6" },
        { header: "BTVN7", accessorKey: "btvn7" },
        { header: "BTVN8", accessorKey: "btvn8" },
        { header: "Kiểm tra tháng", accessorKey: "monthlyTest" },
        { header: "Tổng hợp", accessorKey: "summary" },
        { header: "Nhận xét chung", accessorKey: "generalComment", size: 350 },
        {
            header: "GV đã góp ý",
            id: "teacherReported",
            accessorFn: row => <Center><Checkbox checked={row.teacherReported || false} onChange={() => { }} /></Center>
        },
        { header: "Nội dung GV góp ý", accessorKey: "teacherNote" },
        {
            header: "QLCL duyệt",
            id: "qcApproval",
            size: 250,
            accessorFn: row => <Center><QLCLStatusBadge result={QLCLStatusMap[row.qcApproval || -1]?? -1} /></Center>
        },
        { header: "Nội dung QLCL góp ý", accessorKey: "qcNote" },
        {
            header: "Đã gửi phụ huynh",
            id: "parentNotified",
            accessorFn: row => <Center><Checkbox checked={row.parentNotified || false} onChange={() => { }} /></Center>
        }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "studentCode", header: "Mã học sinh" },
            { fieldName: "studentName", header: "Họ và tên HS" },
            { fieldName: "parentPhone", header: "SĐT Phụ huynh" },
            { fieldName: "status", header: "Trạng thái học" },
            { fieldName: "studentNote", header: "Ghi chú chung HS" },
            { fieldName: "btvn1", header: "BTVN1" },
            { fieldName: "btvn2", header: "BTVN2" },
            { fieldName: "btvn3", header: "BTVN3" },
            { fieldName: "btvn4", header: "BTVN4" },
            { fieldName: "btvn5", header: "BTVN5" },
            { fieldName: "btvn6", header: "BTVN6" },
            { fieldName: "btvn7", header: "BTVN7" },
            { fieldName: "btvn8", header: "BTVN8" },
            { fieldName: "monthlyTest", header: "Kiểm tra tháng" },
            { fieldName: "summary", header: "Tổng hợp" },
            { fieldName: "generalComment", header: "Nhận xét chung" },
            { fieldName: "teacherReported", header: "GV đã góp ý" },
            { fieldName: "teacherNote", header: "Nội dung GV góp ý" },
            { fieldName: "qcApproval", header: "QLCL duyệt" },
            { fieldName: "qcNote", header: "Nội dung QLCL góp ý" },
            { fieldName: "parentNotified", header: "Đã gửi phụ huynh" }
        ]
    };


    return (
        <MyButtonModal disclosure={disc} label='Thông báo phụ huynh' modalSize={"80%"}>
            <MyFieldset title={"Danh sách học sinh"}>
                <MyDataTable
                    isError={query.isError}
                    isLoading={query.isLoading}
                    columns={columns}
                    data={query.data || []}
                    enableRowSelection
                    enableColumnFilters
                    enableRowNumbers
                    renderTopToolbarCustomActions={() => (
                        <>

                            <MyButton crudType='default' onClick={() => { }}>Gửi thông báo</MyButton>
                            <AQButtonExportData
                                objectName={"DanhSachocsinh"}
                                data={query.data || []}
                                exportConfig={exportConfig}
                            />

                        </>
                    )}
                    renderRowActions={() => (
                        <MyCenterFull>
                            <MyButton crudType='default'>Gửi thông báo</MyButton>

                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
        </MyButtonModal>
    )
}
export interface IStudentReport {
    studentCode: string;         // Mã học sinh
    studentName: string;         // Họ và tên HS
    parentPhone: string;         // SĐT Phụ huynh
    status: string;              // Trạng thái học
    studentNote: string;         // Ghi chú chung HS
    btvn1: string;               // BTVN1
    btvn2: string;
    btvn3: string;
    btvn4: string;
    btvn5: string;
    btvn6: string;
    btvn7: string;
    btvn8: string;
    monthlyTest: string;         // Kiểm tra tháng
    summary: string;             // Tổng hợp
    generalComment: string;      // Nhận xét chung
    teacherReported: boolean;    // GV đã góp ý
    teacherNote: string;         // Nội dung GV góp ý
    qcApproval: string;          // QLCL duyệt
    qcNote: string;              // Nội dung QLCL góp ý
    parentNotified: boolean;     // Đã gửi phụ huynh
}

export const mockData: IStudentReport[] = [
    {
        studentCode: "CG23-0103",
        studentName: "Nguyễn Ngọc Trang Anh",
        parentPhone: "0974681988",
        status: "Đang học",
        studentNote: "Chưa làm bài tập, về nhà thường xuyên",
        btvn1: "8.0",
        btvn2: "7.5",
        btvn3: "CCG",
        btvn4: "6.5",
        btvn5: "7.0",
        btvn6: "",
        btvn7: "",
        btvn8: "",
        monthlyTest: "8.5",
        summary: `*Chuyên cần: 10/10
Không làm & CCG: 0
TB điểm BTVN: 7.25
Điểm kiểm tra: 8.5*`,
        generalComment: `Thầy cô nhận xét về tình hình học tập của con trong tháng như sau:
- Về ý thức: Con nghiêm túc lắng nghe giảng, ghi chú nhưng trong học tập còn thiếu bài đầy đủ, tập trung nghe giảng chưa tốt, và còn quên làm bài tập về nhà.
- Về nội dung kiến thức: Tháng này con được học về dãy số và các phép biến đổi đại số, các dạng bài giải bằng phương pháp bất đẳng thức, biểu diễn số trên trục số. Chúc con học tốt và tiếp tục học ở các lớp cấp bậc!`,
        teacherReported: true,
        teacherNote: "",
        qcApproval: "Duyệt",
        qcNote: "Đã duyệt và gửi phụ huynh.",
        parentNotified: true,
    },
    {
        studentCode: "CG23-0104",
        studentName: "Mẫn Vũ Minh Anh",
        parentPhone: "0912378252",
        status: "Đang học",
        studentNote: "Nghỉ buổi 2",
        btvn1: "7.0",
        btvn2: "6.5",
        btvn3: "CCG",
        btvn4: "P",
        btvn5: "6.0",
        btvn6: "8.0",
        btvn7: "",
        btvn8: "",
        monthlyTest: "7.5",
        summary: `*Chuyên cần: 8/10
Không làm & CCG: 1
TB điểm BTVN: 6.9
Điểm kiểm tra: 7.5*`,
        generalComment: `- Về ý thức: Con có sự nỗ lực, tập trung học tập trung hơn, tự nhắc lỗi của mình nhưng đôi lúc còn chưa chủ động làm bài tập ở nhà.
- Về nội dung kiến thức: Con còn thiếu bài tập về nhà, kiến thức cần nắm vững hơn đặc biệt là phần Cauchy. Cần bổ sung bài giảng phương pháp đại số, phát biểu biểu diễn số trên trục số và các phép biến đổi đại số. Chúc con học tốt!`,
        teacherReported: true,
        teacherNote: "Cần nhắc nhở về BTVN",
        qcApproval: "Yêu cầu hiệu chỉnh",
        qcNote: "Nhận xét cần bổ sung chi tiết hơn về điểm mạnh của học sinh.",
        parentNotified: false,
    },
    {
        studentCode: "CG24-0115",
        studentName: "Nguyễn Quốc Minh Chí",
        parentPhone: "0964252508",
        status: "Đang học",
        studentNote: "",
        btvn1: "9.0",
        btvn2: "8.5",
        btvn3: "8.0",
        btvn4: "9.0",
        btvn5: "9.5",
        btvn6: "9.0",
        btvn7: "",
        btvn8: "",
        monthlyTest: "9.0",
        summary: `*Chuyên cần: 10/10
Không làm & CCG: 0
TB điểm BTVN: 8.7
Điểm kiểm tra: 9.0*`,
        generalComment: `Thầy/cô nhận xét về tình hình học tập của con trong tháng như sau:
- Về ý thức: Con chăm chỉ, nghiêm túc trong học tập, có sự chủ động hỏi bài, nắm chắc kiến thức cơ bản, tiếp thu tốt.
- Về nội dung kiến thức: Cần nắm vững kiến thức lý thuyết, áp dụng được các bài toán chắc chắn hơn.
- Tổng kết: Con có kết quả học tập xuất sắc!`,
        teacherReported: true,
        teacherNote: "Không có góp ý thêm",
        qcApproval: "Duyệt",
        qcNote: "Đã duyệt.",
        parentNotified: true,
    }
];
