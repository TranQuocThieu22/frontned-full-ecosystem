
import { useQuery } from '@tanstack/react-query';
import { MyButton, MyCenterFull, MyCheckbox, MyDataTable, MyFieldset, MyFlexRow } from 'aq-fe-framework/components';
import { utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { IF12_2_1ReadNewCurriculum, needOfUsageEnum } from '../(12)/(2)/12-2-1/F12_2_1ReadNewCurriculum';
import ProposalTableCheck from './ProposalTableCheck';
import ProposalTableDetail from './ProposalTableDetail';

export default function ProposalTable() {
    const query = useQuery<IF12_2_1ReadNewCurriculum[]>({
        queryKey: ['ProposalTable'],
        queryFn: async () =>  mockData ?? [],
    });

    const columns = useMemo<MRT_ColumnDef<IF12_2_1ReadNewCurriculum>[]>(() => [
        {
            header: "Mã đề xuất",
            accessorKey: "suggestionCode",
        },
        {
            header: "Tên Giáo trình Đề xuất",
            accessorKey: "curriculumVietnameseName",
        },
        {
            header: "Trạng thái Đề xuất hiện tại",
            accessorKey: "suggestionStatus",
        },
        {
            header: "Kết quả Kiểm tra Sơ bộ",
            accessorKey: "suggestionResult",
        },
        {
            header: "Nhận xét Kiểm tra Sơ bộ",
            accessorKey: "suggestionCritics",
        },
        {
            header: "Ngày kiểm tra",
            accessorKey: "dateOfProposal",
            accessorFn: row =>  utils_date_dateToDDMMYYYString(new Date(row.dateOfProposal || "")),
        },
        {
            header: "Người kiểm tra",
            accessorKey: "criticsBy",
        },
        {
            header: "Đã gửi thông báo",
            accessorKey: "announcementCheck",
            accessorFn: (row) => <MyCenterFull><MyCheckbox checked={row.announcementCheck} readOnly={true}/></MyCenterFull>
        },
    ], []);
    return(
        <MyFieldset title="Danh sách đăng ký">
            <MyDataTable
                data={query.data ?? []}
                columns={columns}
                isLoading={query.isLoading}
                isError={query.isError}
                enableRowSelection={true}
                renderTopToolbarCustomActions={() => (
                    <MyCenterFull>
                        <MyButton crudType="export">Export</MyButton>
                    </MyCenterFull>
                )}
                renderRowActions={({ row }) => (
                    <MyFlexRow>
                        <ProposalTableDetail values={row.original}/>
                        <ProposalTableCheck values={row.original}/>
                    </MyFlexRow>
                )}
            />
        </MyFieldset>
    )

}

export const mockData: IF12_2_1ReadNewCurriculum[] = [
    {
        suggestionCode: "GT2025001",
        curriculumVietnameseName: "Giáo trình Nguyên lý Kế toán",
        curriculumEnglishName: "Principles of Accounting",
        fieldOfStudy: {
            fieldName: "Kế toán",
            fieldMajor:"Kinh tế",
        },
        majorApplied: [""],
        targetOfCurriculum: "Sinh viên năm 2 ngành Kế toán;"+"Học viên cao học chuyên ngành Tài chính",
        curriculumDescription: "Giáo trình này cung cấp kiến thức cơ bản về nguyên lý kế toán, bao gồm các khái niệm, nguyên tắc và quy trình kế toán cơ bản.",
        applicationOfCurriculum: "Trang bị kiến thức thức cơ bản;\n Phát triển kỹ năng phân tích \n Nâng cao năng lực ứng dựng.",
        expectedChapters: 10,
        expectedPages: 250,
        expectedCompletionMonth: "12 tháng",
        needOfUsage: needOfUsageEnum["PV môn học hiện có"],
        suggestionStatus:"Đang chờ sơ duyệt",
        suggestionResult: "Đã yêu cầu sơ bộ",
        suggestionCritics: "Tất cả thông tin đã đầy đủ;Đề cương đính kèm rõ ràng",
        dateOfProposal: "2025-06-29",
        criticsBy: "Nguyễn Thị X (NV.QLKH01)",
        announcementCheck: true,

    },
    {
        suggestionCode: "GT2025002",
        curriculumVietnameseName: "Giáo trình Phân tích Dữ liệu lớn",
        curriculumEnglishName: "Big Data Analysis Textbook",
        fieldOfStudy:{
            fieldName: "Công nghệ thông tin",
            fieldMajor: "Khoa học máy tính",
        },
        targetOfCurriculum:"Sinh viên cao học ngành Khoa học Dữ liệu",
        curriculumDescription: "Giáo trình giới thiệu các kỹ thuật thu hẹp; \n xử lý và phân tích dữ liệu lớn;\n ứng dụng trong các bài toán thực tế.",
        applicationOfCurriculum: "Giúp sinh viên nắm vững kiến thức về Big Data;\n Nâng cao kỹ năng thực hành phân tích dữ liệu;\n Chuẩn bị cho các dự án lớn",
        expectedChapters: 8,
        expectedPages: 200,
        expectedCompletionMonth: "9 tháng",
        suggestionStatus: "Đang chờ sơ duyệt",
        suggestionResult: "Yêu cầu bổ sung thông tin",
        suggestionCritics: "Thiếu thông tin chi tiết về 'Dự Án Thành viên biên soạn';Cần mô tả rõ hơn 'Mục tiêu của giáo trình'",
        needOfUsage: needOfUsageEnum["PV môn học hiện có"],
        dateOfProposal: "2025-06-29",
        criticsBy: "Nguyễn Thị X (NV.QLKH01)",
        announcementCheck: false,
    },
    {
        suggestionCode: "GT2025003",
        curriculumVietnameseName: "Giáo trình Lịch sử Văn học Việt Nam",
        suggestionStatus: "Đang chờ sơ duyệt",
        needOfUsage: needOfUsageEnum["PV môn học hiện có"],
        suggestionResult: "Đã yêu cầu sơ bộ",
        suggestionCritics: "Đề xuất đầy đủ và phù hợp với quy định chung của Phòng QLKH",
        dateOfProposal: "2025-06-30",
        criticsBy: "Phạm Văn Y (NV.QLKH02)",
        announcementCheck: true,
    },
]
export interface I_ProposalMemberTable {
    code: string;      // Mã NS
    name: string;      // Họ tên
    department: string; // Đơn vị
    email: string;      // Email
    phone: string;      // Số điện thoại
    role: string;      // Vai trò
}
export const roleOptions = [
    { value: "Trưởng ban", label: "Trưởng ban" },
    { value: "Thành viên", label: "Thành viên" },
];
export const proposalTableMemberMockData: I_ProposalMemberTable[] = [
    {
        code: "GV0258",
        name: "Tô Ngọc Báo",
        department: "KCNTT",
        email:"",
        phone: "",
        role: "Trưởng ban",
    },
    {
        code: "GV1253",
        name: "Tô Lanh",
        department: "KDDT",
        email:"",
        phone: "",
        role: "Thành viên",
    },
];