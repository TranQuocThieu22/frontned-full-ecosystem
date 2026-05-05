'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { EnumSurveyType, EnumSurveyTypeLabel } from "@/enums/EnumSurveyType";
import SurveyActivityGroupDelete from "./SurveyActivityGroupDelete";
import SurveyActivityGroupDeleteList from "./SurveyActivityGroupDeleteList";
import SurveyActivityGroupCreate from "./SurveyActivityGroupCreate";
import SurveyActivityGroupUpdate from "./SurveyActivityGroupUpdate";

interface SurveyActivityGroup {
    id?: number;
    code: string;
    name: string;
    describe?: string;
    surveyTypes: EnumSurveyType[] | string;
}

export default function SurveyActivityGroupLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns: MRT_ColumnDef<SurveyActivityGroup>[] = [
        {
            header: "Mã Hoạt động",
            accessorKey: "code",
        },
        {
            header: "Tên Nhóm Hoạt động",
            accessorKey: "name",
        },
        {
            header: "Các Loại Phiếu Khảo sát Được Gán",
            accessorKey: "surveyTypes",
            accessorFn: (row) => Array.isArray(row.surveyTypes) ? row.surveyTypes.map((type) => EnumSurveyTypeLabel[type as EnumSurveyType]).join("; ") : row.surveyTypes
        },
    ];


    return (
        <MyFieldset title="Danh sách nhóm hoạt động" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockActivitySurvey || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <SurveyActivityGroupCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <SurveyActivityGroupDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <SurveyActivityGroupUpdate
                                values={{
                                    ...row.original,
                                    surveyTypes: Array.isArray(row.original.surveyTypes)
                                        ? row.original.surveyTypes.map((type) => ({
                                            timeCreate: Date.now()- Math.floor(Math.random() * (50000)) + 1,
                                            code: type.toString(),
                                            title: EnumSurveyTypeLabel[type].replace(/^\d+\.\s*/, "")
                                        }))
                                        : []
                                }}
                            />
                            <SurveyActivityGroupDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

export const mockActivitySurvey: SurveyActivityGroup[] = [
    {
        id: 1,
        code: "KHSCL",
        name: "Hoạt động xây dựng và triển khai kế hoạch chiến lược phát triển Trường",
        surveyTypes: "Các loại phiếu đánh giá chiến lược (nếu có)",
    },
    {
        id: 2,
        code: "CTDT",
        name: "Hoạt động xây dựng; rà soát và tổ chức thực hiện chương trình đào tạo",
        surveyTypes: [6, 23, 24],
    },
    {
        id: 3,
        code: "TSQD",
        name: "Chính sách tuyển sinh; truyền thông và hoạt động quảng bá tuyển sinh",
        surveyTypes: "Các loại phiếu khảo sát tuyển sinh (nếu có)",
    },
    {
        id: 4,
        code: "DGTKHT",
        name: "Hoạt động đo lường và đánh giá kết quả học tập của người học",
        surveyTypes: [17, 22],
    },
    {
        id: 5,
        code: "KHCNHTQT",
        name: "Hoạt động khoa học công nghệ; hợp tác trong nước và ngoài nước",
        surveyTypes: "Các loại phiếu khảo sát KHCN (nếu có); Các loại phiếu khảo sát hợp tác quốc tế (nếu có)",
    },
    {
        id: 6,
        code: "CSVCAN",
        name: "Cơ sở vật chất; môi trường cảnh quan và an ninh trường học",
        surveyTypes: "Các loại phiếu khảo sát CSVC (nếu có); Các loại phiếu khảo sát môi trường (nếu có); Các loại phiếu khảo sát an ninh (nếu có)",
    },
    {
        id: 7,
        code: "CNTTCDL",
        name: "Hệ thống hạ tầng mạng công nghệ thông tin; cơ sở dữ liệu và thông tin quản lý",
        surveyTypes: "Các loại phiếu khảo sát CNTT (nếu có)",
    },
    {
        id: 8,
        code: "TVHL",
        name: "Hệ thống thư viện và học liệu phục vụ đào tạo",
        surveyTypes: "Các loại phiếu khảo sát thư viện (nếu có)",
    },
    {
        id: 9,
        code: "DVHTCD",
        name: "Hoạt động dịch vụ hỗ trợ người học và gắn kết cộng đồng",
        surveyTypes: "Các loại phiếu khảo sát dịch vụ SV (nếu có); Các loại phiếu khảo sát gắn kết cộng đồng (nếu có)",
    },
    {
        id: 10,
        code: "HNTVVL",
        name: "Hoạt động hướng nghiệp; tư vấn việc làm và tình trạng việc làm; thu nhập của người học sau khi tốt nghiệp",
        surveyTypes: "Các loại phiếu khảo sát việc làm sau tốt nghiệp (nếu có); Các loại phiếu khảo sát tư vấn hướng nghiệp (nếu có)",
    },
    {
        id: 11,
        code: "DTBDCMNV",
        name: "Hoạt động đào tạo; bồi dưỡng phát triển chuyên môn và nghiệp vụ",
        surveyTypes: "Các loại phiếu khảo sát đào tạo bồi dưỡng (nếu có)",
    },
    {
        id: 12,
        code: "DBCL",
        name: "Hoạt động đảm bảo chất lượng",
        surveyTypes: [1, 7, 8],
    },
];
